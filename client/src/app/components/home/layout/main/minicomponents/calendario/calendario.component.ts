import { ChangeDetectionStrategy, Component, EventEmitter, Input, model, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'calendario',
  imports: [MatDatepickerModule, MatNativeDateModule, MatCardModule,CommonModule],
  templateUrl: './calendario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioComponent {
  @Input() initialDate: Date | null = null;
  @Output() dateChange = new EventEmitter<Date | null>();
  selected: Date | null = null;

  today: Date = new Date();

  constructor() {}

  ngOnInit() {
    // Inicializar con la fecha recibida si existe
    if (this.initialDate) {
      this.selected = this.initialDate;
    }
  }

  onDateSelected(date: Date | null) {
    this.selected = date;
    this.dateChange.emit(date);
  }

  // Filtro para deshabilitar los días pasados
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  };
}
