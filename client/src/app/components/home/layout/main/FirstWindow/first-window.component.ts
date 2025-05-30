import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CalendarioComponent } from "../minicomponents/calendario/calendario.component";
import { ZonaHorariaComponent } from '../minicomponents/zona-horaria/zona-horaria.component';
import { HorasReservaComponent } from '../minicomponents/horas-reserva/horas-reserva.component';
import { ReservasDataService } from '../../../../../services/reservas-data.service';
import { Servicio } from '../../../../../models/servicios/servicio';
import { TranslatePipe } from '../../../../../pipe/translate.pipe';

@Component({
  selector: 'app-first-window',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CalendarioComponent,
    ZonaHorariaComponent,
    HorasReservaComponent,
    TranslatePipe
  ],
  templateUrl: './first-window.component.html',
})
export class FirstWindowComponent implements OnInit {
  selectedDate: Date | null = new Date();
  selectedHour: string | null = null;
  selectedTimezone: string | null = null;

  currentServiceDuration: number = 30;

  constructor(@Inject(ReservasDataService) private reservasDataService: ReservasDataService) {}

  ngOnInit(): void {
    if (this.selectedDate) {
      this.onDateSelected(this.selectedDate);
    }

    const servicioSeleccionado: Servicio | null = this.reservasDataService.getServicioSeleccionado();
    if (servicioSeleccionado && servicioSeleccionado.duracionMinutos) {
      this.currentServiceDuration = servicioSeleccionado.duracionMinutos;
    }
  }

  onDateSelected(date: Date | null): void {
    this.selectedDate = date;
    this.reservasDataService.setDate(this.selectedDate);
  }

  onHourSelected(hour: string): void {
    this.selectedHour = hour;
    this.reservasDataService.setHour(this.selectedHour);
  }

  onTimezoneSelected(timezone: string): void {
    this.selectedTimezone = timezone;
    this.reservasDataService.setTimezone(this.selectedTimezone);
  }
}
