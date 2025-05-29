import { Component } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../pipe/translate.pipe';

@Component({
  selector: 'app-second-window',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './second-window.component.html',
})
export class SecondWindowComponent {
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    domicilio: '',
    ciudad: '',
    codigoPostal: '',
    notas: '',
  };

  validationErrors: { [key: string]: string } = {};

  constructor(private reservasService: ReservasDataService) {
    const contactInfo = this.reservasService.getContactInfo();
    if (contactInfo && Object.keys(contactInfo).length > 0) {
      this.formData = { ...contactInfo };
    }
  }

  isFormValid(): boolean {
    this.validationErrors = {};

    if (!this.formData.nombre.trim()) {
      this.validationErrors['nombre'] = 'El nombre es obligatorio.';
    }
    if (!this.formData.apellido.trim()) {
      this.validationErrors['apellido'] = 'El apellido es obligatorio.';
    }
    if (!this.formData.email.trim()) {
      this.validationErrors['email'] = 'El email es obligatorio.';
    } else if (!this.isValidEmail(this.formData.email)) {
      this.validationErrors['email'] = 'El email no es válido.';
    }
    if (!this.formData.telefono.trim()) {
      this.validationErrors['telefono'] = 'El teléfono es obligatorio.';
    } else if (!/^[0-9]{9,15}$/.test(this.formData.telefono)) {
      this.validationErrors['telefono'] = 'El teléfono debe tener entre 9 y 15 dígitos.';
    }
    if (this.formData.codigoPostal && !/^[0-9]{5}$/.test(this.formData.codigoPostal)) {
      this.validationErrors['codigoPostal'] = 'El código postal debe tener 5 dígitos.';
    }
    return Object.keys(this.validationErrors).length === 0;
  }

  saveData(): void {
    if (this.isFormValid()) {
      this.reservasService.setContactInfo(this.formData);
    }
  }

  getErrorMessage(field: string): string {
    return this.validationErrors[field] || '';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
