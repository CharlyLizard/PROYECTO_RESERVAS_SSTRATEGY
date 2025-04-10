import { Component, effect, ViewChild } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { FirstWindowComponent } from "../FirstWindow/first-window.component";
import { HeaderComponent } from "../../Header/header.component";
import { SecondWindowComponent } from "../second-window/second-window.component";
import { ReservasDataService } from '../../../../../services/reservas-data.service';
import { ThirdWindowComponent } from '../third-window/third-window.component';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../../services/api/api.service';
import { Appointment } from '../../../../../models/appointment/appointment.model';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  imports: [FirstWindowComponent, HeaderComponent, SecondWindowComponent, CommonModule,ThirdWindowComponent,MatIconModule],
})

export class StepperComponent {
  currentStep = 0;

  @ViewChild(SecondWindowComponent) secondWindowComponent!: SecondWindowComponent;

  constructor(private reservasService: ReservasDataService, private ApiService: ApiService) {

    // Efecto para reaccionar a los cambios en los signals
    effect(() => {


      const response = this.ApiService.reservationResponse();
      if (response) {
        console.log('Respuesta del servidor:', response);
      }


    });

  }

  // Avanzar al siguiente paso
  nextStep(): void {
    // Si estamos en el paso del formulario (paso 1), guardar los datos antes de avanzar
    if (this.currentStep === 1 && this.secondWindowComponent) {
      this.secondWindowComponent.saveData();
    }

    if (this.canProceed() && this.currentStep < 2) {
      this.currentStep++;
    }
  }

  // Retroceder al paso anterior
  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Método para verificar si se puede avanzar al siguiente paso
  canProceed(): boolean {
    if (this.currentStep === 0) {
      return this.reservasService.isFirstStepComplete();
    } else if (this.currentStep === 1) {
      // Si tenemos referencia al componente, verificar si el formulario es válido
      return this.secondWindowComponent ? this.secondWindowComponent.isFormValid() : false;
    }

    return true;
  }

  confirm(): void {
    const formData = this.reservasService.getContactInfo(); // Datos del formulario
    const appointmentData = this.reservasService.getReservationDetails(); // Datos de la cita

    // Construir el objeto Appointment con todos los datos
    const appointment: Appointment = {
      id: 0, // ID generado por el backend (puedes dejarlo como 0 o null)
      client: {
        id: 0, // ID generado por el backend
        name: formData.nombre,
        email: formData.email,
        phone: formData.telefono,
        address: formData.domicilio || '', // Opcional
        city: formData.ciudad || '', // Opcional
        postalCode: formData.codigoPostal || '', // Opcional
      },
      date: appointmentData.date ? appointmentData.date.toISOString() : '', // Convertir Date a string
      time: appointmentData.hour || '',
      timezone: appointmentData.timezone || '', // Zona horaria
      service: '', // Servicio solicitado
      notes: formData.notas || '', // Notas adicionales
    };

    // Enviar los datos al servidor
    this.ApiService.sendReservationData(appointment);
  }
}
