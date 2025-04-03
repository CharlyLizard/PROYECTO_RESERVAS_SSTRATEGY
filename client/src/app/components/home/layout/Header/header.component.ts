import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule ,CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() step: number = 0;
  steps = ["Seleccionar Fecha", "Rellenar Formulario", "Confirmación"];
  currentStep = 0;

  nextStep() {
    if (this.currentStep < 2) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  
}
