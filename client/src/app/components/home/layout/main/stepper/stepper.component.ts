import { Component } from '@angular/core';
import { CalendarioComponent } from "../minicomponents/calendario/calendario.component";
import { CommonModule, NgSwitch } from '@angular/common';
import { FirstWindowComponent } from "../FirstWindow/first-window.component";
import { HeaderComponent } from "../../Header/header.component";
import { SecondWindowComponent } from "../second-window/second-window.component";
import { ReservasDataService } from '../../../../../services/reservas-data.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  imports: [FirstWindowComponent, HeaderComponent, SecondWindowComponent],
})

export class StepperComponent {
  currentStep = 0; // Paso actual

  constructor(private reservasService: ReservasDataService) {}
  // Avanzar al siguiente paso
  nextStep(): void {
    if (this.currentStep < 2) {
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
    }

    // Para otros pasos puedes agregar más validaciones
    return true;
  }
}
