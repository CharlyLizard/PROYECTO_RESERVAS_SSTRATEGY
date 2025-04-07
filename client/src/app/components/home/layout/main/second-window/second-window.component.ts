import { Component } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { FormsModule } from '@angular/forms';
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

  constructor(private reservasService: ReservasDataService) {
    // Cargar datos existentes si los hay
    const contactInfo = this.reservasService.getContactInfo();
    if (contactInfo && Object.keys(contactInfo).length > 0) {
      this.formData = { ...contactInfo };
    }
  }

  // Método para validar el formulario
  isFormValid(): boolean {
    return !!this.formData.nombre &&
           !!this.formData.apellido &&
           !!this.formData.email &&
           !!this.formData.telefono;
  }

  // Método para guardar los datos
  saveData(): void {
    console.log('Datos del formulario guardados:', this.formData);
    this.reservasService.setContactInfo(this.formData);
  }
}
