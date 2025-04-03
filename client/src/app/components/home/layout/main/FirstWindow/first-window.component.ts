import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from "../minicomponents/calendario/calendario.component";
import { ZonaHorariaComponent } from '../minicomponents/zona-horaria/zona-horaria.component';
import { HorasReservaComponent } from '../minicomponents/horas-reserva/horas-reserva.component';
import { HeaderComponent } from "../../Header/header.component";
import { FooterComponent } from "../../Footer/footer.component";

@Component({
  selector: 'app-first-window',
  imports: [MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, CommonModule, CalendarioComponent, ZonaHorariaComponent, HorasReservaComponent],
  templateUrl: './first-window.component.html',
})
export class FirstWindowComponent {
  selectedDate: Date | null = null;
  selectedHour: string | null = null;
  selectedTimezone: string | null = null;

  onDateSelected(date: Date | null) {
    this.selectedDate = date;
  }

  onHourSelected(hour: string) {
    this.selectedHour = hour;
  }
  onTimezoneSelected(timezone: string) {
    this.selectedTimezone = timezone;
  }
}
