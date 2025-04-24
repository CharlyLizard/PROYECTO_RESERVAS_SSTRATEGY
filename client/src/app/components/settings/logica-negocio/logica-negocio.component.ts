import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logica-negocio',
  templateUrl: './logica-negocio.component.html',
  styleUrls: ['./logica-negocio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule]
})
export class LogicaNegocioComponent {
  horarioLaboral = [
    { dia: 'Domingo', inicio: '8:00 am', final: '6:00 pm' },
    { dia: 'Lunes', inicio: '8:00 am', final: '6:00 pm' },
    { dia: 'Martes', inicio: '8:00 am', final: '6:00 pm' },
    { dia: 'Miércoles', inicio: '8:00 am', final: '6:00 pm' },
    { dia: 'Jueves', inicio: '8:00 am', final: '6:00 pm' },
    { dia: 'Viernes', inicio: '8:00 am', final: '6:00 pm' },
    { dia: 'Sábado', inicio: '8:00 am', final: '6:00 pm' }
  ];

  periodosDescanso = [
    { dia: 'Domingo', inicio: '2:00 pm', final: '3:00 pm' },
    { dia: 'Lunes', inicio: '2:00 pm', final: '3:00 pm' },
    { dia: 'Martes', inicio: '2:00 pm', final: '3:00 pm' },
    { dia: 'Miércoles', inicio: '2:00 pm', final: '3:00 pm' },
    { dia: 'Jueves', inicio: '2:00 pm', final: '3:00 pm' },
    { dia: 'Viernes', inicio: '2:00 pm', final: '3:00 pm' },
    { dia: 'Sábado', inicio: '2:00 pm', final: '3:00 pm' }
  ];

  estadosCitas = ['Blocked', 'Confirmed', 'Rescheduled', 'Cancelled', 'Draft'];

  agregarPeriodoDescanso() {
    this.periodosDescanso.push({ dia: '', inicio: '', final: '' });
  }

  eliminarPeriodoDescanso(index: number) {
    this.periodosDescanso.splice(index, 1);
  }

  agregarEstadoCita() {
    this.estadosCitas.push('');
  }

  eliminarEstadoCita(index: number) {
    this.estadosCitas.splice(index, 1);
  }

  guardarConfiguracion() {
    console.log('Configuración guardada');
  }
}
