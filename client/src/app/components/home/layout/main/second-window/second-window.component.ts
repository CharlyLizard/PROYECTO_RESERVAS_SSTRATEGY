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

  constructor(private reservasService: ReservasDataService) {}

  goBack() {
    // Lógica para retroceder al paso anterior
    this.reservasService.prevStep();
  }

  goNext() {
    // Guardar los datos en el servicio
    this.reservasService.setContactInfo(this.formData);
    // Avanzar al siguiente paso
    this.reservasService.nextStep();
  }
}
