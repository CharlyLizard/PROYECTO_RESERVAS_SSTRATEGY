import { Component } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-second-window',
  templateUrl: './second-window.component.html',
  imports: [FormsModule],
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

  form: FormGroup;

  constructor(private reservasService: ReservasDataService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      telefono: [''],
      domicilio: [''],
      ciudad: [''],
      codigoPostal: [''],
      notas: [''],
    });
    // Cargar datos existentes si los hay
    const contactInfo = this.reservasService.getContactInfo();
    if (contactInfo && Object.keys(contactInfo).length > 0) {
      this.formData = { ...contactInfo };
    }
  }

  // Método para validar el formulario
  isFormValid(): boolean {
    this.validationErrors = {}; // Limpiar errores previos

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

    // Retornar true si no hay errores
    return Object.keys(this.validationErrors).length === 0;
  }

  // Método para guardar los datos
  saveData(): void {
    if (this.isFormValid()) {
      console.log('Datos del formulario guardados:', this.formData);
      this.reservasService.setContactInfo(this.formData);
    } else {
      console.error('Errores de validación:', this.validationErrors);
    }
  }

  // Método auxiliar para obtener el mensaje de error de un campo
  getErrorMessage(field: string): string {
    return this.validationErrors[field] || '';
  }



  // Método auxiliar para validar el formato del email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
