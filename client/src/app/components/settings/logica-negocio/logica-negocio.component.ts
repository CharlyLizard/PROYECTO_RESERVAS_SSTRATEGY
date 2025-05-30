import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfiguracionService } from '../../../services/api/configuracion.service';

export interface Horario {
  dia: string;
  inicio: string;
  final: string;
}

export interface PeriodoDescanso {
  dia: string;
  inicio: string;
  final: string;
}

export interface LogicaNegocioConfig {
  horarioLaboral: Horario[];
  periodosDescanso: PeriodoDescanso[];
  estadosCitas: string[];
}

@Component({
  selector: 'app-logica-negocio',
  templateUrl: './logica-negocio.component.html',
  styleUrls: ['./logica-negocio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule]
})
export class LogicaNegocioComponent implements OnInit {
  config: LogicaNegocioConfig = {
    horarioLaboral: [
      { dia: 'Domingo', inicio: '09:00', final: '17:00' },
      { dia: 'Lunes', inicio: '09:00', final: '17:00' },
      { dia: 'Martes', inicio: '09:00', final: '17:00' },
      { dia: 'Miércoles', inicio: '09:00', final: '17:00' },
      { dia: 'Jueves', inicio: '09:00', final: '17:00' },
      { dia: 'Viernes', inicio: '09:00', final: '17:00' },
      { dia: 'Sábado', inicio: '10:00', final: '14:00' }
    ],
    periodosDescanso: [
      { dia: 'Lunes', inicio: '13:00', final: '14:00' }
    ],
    estadosCitas: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada', 'No Asistió']
  };

  constructor(private configuracionService: ConfiguracionService) {}

  ngOnInit(): void {
    this.cargarConfiguracionLogicaNegocio();
  }

  cargarConfiguracionLogicaNegocio(): void {
    this.configuracionService.getLogicaNegocioConfig().subscribe({
      next: (data) => {
        if (data) {
          if (data.horarioLaboral && data.horarioLaboral.length > 0) {
            this.config.horarioLaboral = data.horarioLaboral;
          }
          if (data.periodosDescanso && data.periodosDescanso.length > 0) {
            this.config.periodosDescanso = data.periodosDescanso;
          }
          if (data.estadosCitas && data.estadosCitas.length > 0) {
            this.config.estadosCitas = data.estadosCitas;
          }
        }
        console.log('Configuración de lógica de negocio cargada:', this.config);
      },
      error: (err) => console.error('Error al cargar la configuración de lógica de negocio:', err)
    });
  }

  guardarConfiguracion(): void {
    this.configuracionService.saveLogicaNegocioConfig(this.config).subscribe({
      next: (savedConfig) => {
        this.config = savedConfig;
        console.log('Configuración de lógica de negocio guardada:', this.config);
        alert('Configuración de lógica de negocio guardada exitosamente.');
      },
      error: (err) => {
        console.error('Error al guardar la configuración de lógica de negocio:', err);
        alert('Error al guardar la configuración.');
      }
    });
  }

  agregarPeriodoDescanso(): void {
    this.config.periodosDescanso.push({ dia: 'Lunes', inicio: '12:00', final: '13:00' });
  }

  eliminarPeriodoDescanso(index: number): void {
    this.config.periodosDescanso.splice(index, 1);
  }

  agregarEstadoCita(): void {
    this.config.estadosCitas.push('Nuevo Estado');
  }

  eliminarEstadoCita(index: number): void {
    this.config.estadosCitas.splice(index, 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
