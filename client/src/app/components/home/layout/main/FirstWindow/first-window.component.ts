import { Component } from '@angular/core';
import { ReservasDataService } from './../../../../../services/reservas-data.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from "../minicomponents/calendario/calendario.component";
import { ZonaHorariaComponent } from '../minicomponents/zona-horaria/zona-horaria.component';
import { HorasReservaComponent } from '../minicomponents/horas-reserva/horas-reserva.component';
@Component({
  selector: 'app-first-window',
  imports: [
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CalendarioComponent,
    ZonaHorariaComponent,
    HorasReservaComponent,
  ],
  templateUrl: './first-window.component.html',
})
export class FirstWindowComponent {
  // Utilizamos las propiedades del servicio directamente
  get selectedDate(): Date | null {
    return this.ReservasSvc.selectedDate;
  }

  get selectedHour(): string | null {
    return this.ReservasSvc.selectedHour;
  }

  get selectedTimezone(): string | null {
    return this.ReservasSvc.selectedTimezone;
  }

  constructor(private ReservasSvc: ReservasDataService) {}

  ngOnInit() {
    // No necesitamos inicializar nada aquí, ya que los datos se recuperan del servicio
  }

  onDateSelected(date: Date | null) {
    this.ReservasSvc.setDate(date);
  }

  onHourSelected(hour: string) {
    this.ReservasSvc.setHour(hour);
  }

  onTimezoneSelected(timezone: string) {
    this.ReservasSvc.setTimezone(timezone);
  }
}
