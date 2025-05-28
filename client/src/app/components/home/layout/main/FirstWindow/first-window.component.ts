import { Component, OnInit, Inject } from '@angular/core';
// Corrige esta ruta
import { ReservasDataService } from '../../../../../services/reservas-data.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from "../minicomponents/calendario/calendario.component";
import { ZonaHorariaComponent } from '../minicomponents/zona-horaria/zona-horaria.component';
import { HorasReservaComponent } from '../minicomponents/horas-reserva/horas-reserva.component';
// Corrige esta ruta:
// import { Servicio } from '../../../../../models/Servicio/servicio.model';
// Por esta:
import { Servicio } from '../../../../../models/servicios/servicio';
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
  // providers: [ReservasDataService], // Elimina esta línea
  templateUrl: './first-window.component.html',
})
export class FirstWindowComponent implements OnInit {
  selectedDate: Date | null = new Date(); // Inicializar con la fecha actual
  selectedHour: string | null = null;
  selectedTimezone: string | null = null;

  currentServiceDuration: number = 30;

  constructor(@Inject(ReservasDataService) private reservasDataService: ReservasDataService) {}

  ngOnInit(): void {
    // Si selectedDate se inicializa, llamar a onDateSelected para propagar
    if (this.selectedDate) {
      this.onDateSelected(this.selectedDate);
    }

    const servicioSeleccionado: Servicio | null = this.reservasDataService.getServicioSeleccionado();
    if (servicioSeleccionado && servicioSeleccionado.duracionMinutos) {
      this.currentServiceDuration = servicioSeleccionado.duracionMinutos;
    }
    // También podrías suscribirte a cambios en el servicio seleccionado si puede cambiar dinámicamente
  }

  onDateSelected(date: Date | null): void {
    this.selectedDate = date; // Esta propiedad se enlaza al input de HorasReservaComponent
    this.reservasDataService.setDate(this.selectedDate);
    // La actualización de horas en HorasReservaComponent se activará por ngOnChanges
    // cuando this.selectedDate (que es un @Input para HorasReservaComponent) cambie.
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
