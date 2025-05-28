import { Component, EventEmitter, OnInit, Output, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimezoneGroup {
  continent: string;
  timezones: string[];
}

@Component({
  selector: 'app-zona-horaria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zona-horaria.component.html',
})
export class ZonaHorariaComponent implements OnInit {
  @Input() initialTimezone: string | null = null;
  @Output() timezoneSelected = new EventEmitter<string>();

  selectedTimezone: string = '';
  groupedTimezones: TimezoneGroup[] = [];
  isDropdownOpen = false;

  // Para cerrar el dropdown si se hace clic fuera
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    try {
      const allTimezones = Intl.supportedValuesOf('timeZone');
      this.groupTimezonesByContinent(allTimezones);

      let defaultTimezone = this.initialTimezone;

      if (!defaultTimezone || !allTimezones.includes(defaultTimezone)) {
        defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }

      if (allTimezones.includes(defaultTimezone)) {
        this.selectedTimezone = defaultTimezone;
      } else if (this.groupedTimezones.length > 0 && this.groupedTimezones[0].timezones.length > 0) {
        this.selectedTimezone = this.groupedTimezones[0].timezones[0];
      }
      this.timezoneSelected.emit(this.selectedTimezone); // Emitir la zona horaria inicial
    } catch (e) {
      console.error('Error al obtener las zonas horarias:', e);
      // Fallback con algunas zonas comunes si Intl.supportedValuesOf no funciona o da error
      const fallbackTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
      this.groupTimezonesByContinent(fallbackTimezones);
      this.selectedTimezone = this.initialTimezone && fallbackTimezones.includes(this.initialTimezone) ? this.initialTimezone : 'UTC';
      this.timezoneSelected.emit(this.selectedTimezone);
    }
  }

  private groupTimezonesByContinent(timezones: string[]): void {
    const groups: { [key: string]: string[] } = {};
    timezones.forEach(tz => {
      const parts = tz.split('/');
      const continent = parts[0];
      if (parts.length > 1) { // Solo agrupar si tiene formato Continente/Ciudad
        if (!groups[continent]) {
          groups[continent] = [];
        }
        groups[continent].push(tz);
      } else { // Para zonas como 'UTC', 'GMT', etc.
        if (!groups['Otros']) {
          groups['Otros'] = [];
        }
        groups['Otros'].push(tz);
      }
    });

    this.groupedTimezones = Object.keys(groups)
      .sort() // Ordenar continentes alfabéticamente
      .map(continent => ({
        continent,
        timezones: groups[continent].sort() // Ordenar zonas dentro de cada continente
      }));
  }

  onTimezoneChange(timezone: string): void {
    this.selectedTimezone = timezone;
    this.timezoneSelected.emit(this.selectedTimezone);
    this.isDropdownOpen = false; // Cerrar dropdown al seleccionar
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
