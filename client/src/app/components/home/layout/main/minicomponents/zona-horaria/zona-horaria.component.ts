import { Component, EventEmitter, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'zona-horaria',
  imports: [MatSelectModule],
  templateUrl: './zona-horaria.component.html'
})
export class ZonaHorariaComponent {
  @Output() timezoneChange = new EventEmitter<string>(); // ✅ Emitir la zona horaria seleccionada

  onTimezoneSelected(timezone: string) {
    this.timezoneChange.emit(timezone); // ✅ Emitir el valor seleccionado
  }
}
