import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { FirstWindowComponent } from "../FirstWindow/first-window.component";
import { HeaderComponent } from "../../Header/header.component";
import { SecondWindowComponent } from "../second-window/second-window.component";
import { ReservasDataService } from '../../../../../services/reservas-data.service';
import { ThirdWindowComponent } from '../third-window/third-window.component';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  imports: [FirstWindowComponent, HeaderComponent, SecondWindowComponent, CommonModule,ThirdWindowComponent,MatIconModule],
})

export class StepperComponent {
  currentStep = 0;

  @ViewChild(SecondWindowComponent) secondWindowComponent!: SecondWindowComponent;

  constructor(private reservasService: ReservasDataService) {}

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
    const formData = this.reservasService.getContactInfo();

    // Obtener los datos de la cita desde el servicio ReservasDataService
    const appointmentData = this.reservasService.getReservationDetails();

    // Mostrar los datos en la consola
    console.log('Datos del formulario:', formData);
    console.log('Datos de la cita:', appointmentData);

    // Aquí puedes realizar acciones adicionales, como enviar los datos a un servidor
  }
}
