import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'calendario',
  imports: [MatDatepickerModule, MatNativeDateModule, MatCardModule],
  templateUrl: './calendario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioComponent {
  selected = model<Date | null>(null);

  today: Date = new Date();

  constructor() {}

  // Filtro para deshabilitar los días pasados
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  };
}
