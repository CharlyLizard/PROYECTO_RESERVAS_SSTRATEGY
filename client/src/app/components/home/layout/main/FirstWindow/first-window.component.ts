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
