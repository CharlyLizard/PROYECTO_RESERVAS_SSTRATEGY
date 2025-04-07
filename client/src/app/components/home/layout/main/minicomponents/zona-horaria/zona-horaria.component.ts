import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'zona-horaria',
  imports: [MatSelectModule],
  templateUrl: './zona-horaria.component.html'
})
export class ZonaHorariaComponent {
  @Input() initialTimezone: string | null = null;
  @Output() timezoneChange = new EventEmitter<string>();

  selectedTimezone: string | null = null;

  ngOnInit() {
    // Inicializar con el valor guardado si existe
    if (this.initialTimezone) {
      this.selectedTimezone = this.initialTimezone;
    }
  }

  onTimezoneSelected(timezone: string) {
    this.selectedTimezone = timezone;
    this.timezoneChange.emit(timezone);
  }
}
