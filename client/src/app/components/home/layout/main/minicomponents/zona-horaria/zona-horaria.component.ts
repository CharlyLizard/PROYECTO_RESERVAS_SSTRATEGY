import { Component, EventEmitter, OnInit, Output, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TimezoneEntry {
  name: string;         // Ejemplo: "Europe/Madrid"
  displayName: string;  // Ejemplo: "Europe/Madrid (GMT+2:00)"
}

interface TimezoneGroup {
  continent: string;
  timezones: TimezoneEntry[];
}

@Component({
  selector: 'app-zona-horaria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zona-horaria.component.html',
})
export class ZonaHorariaComponent implements OnInit {
  @Input() initialTimezone: string | null = null; // Sigue siendo el nombre de la zona, ej: "Europe/Madrid"
  @Output() timezoneSelected = new EventEmitter<string>(); // Emite el nombre de la zona

  selectedTimezoneName: string = '';      // Nombre de la zona seleccionada (ej: "Europe/Madrid")
  selectedTimezoneDisplay: string = ''; // Texto para mostrar en el botón (ej: "Europe/Madrid (GMT+2:00)")
  groupedTimezones: TimezoneGroup[] = [];
  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    try {
      const allTimezoneNames = Intl.supportedValuesOf('timeZone');
      this.groupTimezonesByContinent(allTimezoneNames);

      let defaultTimezoneName = this.initialTimezone;

      if (!defaultTimezoneName || !allTimezoneNames.includes(defaultTimezoneName)) {
        defaultTimezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }

      if (allTimezoneNames.includes(defaultTimezoneName)) {
        this.selectedTimezoneName = defaultTimezoneName;
      } else if (this.groupedTimezones.length > 0 && this.groupedTimezones[0].timezones.length > 0) {
        this.selectedTimezoneName = this.groupedTimezones[0].timezones[0].name;
      } else {
        // Fallback si no hay zonas disponibles o la inicial no es válida
        this.selectedTimezoneName = 'UTC'; // O alguna otra zona por defecto segura
      }

      const foundEntry = this.findTimezoneEntry(this.selectedTimezoneName);
      this.selectedTimezoneDisplay = foundEntry ? foundEntry.displayName : this.selectedTimezoneName;

      this.timezoneSelected.emit(this.selectedTimezoneName);
    } catch (e) {
      console.error('Error al obtener las zonas horarias:', e);
      const fallbackTimezones = ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
      this.groupTimezonesByContinent(fallbackTimezones);
      const initialName = this.initialTimezone && fallbackTimezones.includes(this.initialTimezone) ? this.initialTimezone : 'UTC';
      this.selectedTimezoneName = initialName;
      const foundEntry = this.findTimezoneEntry(initialName);
      this.selectedTimezoneDisplay = foundEntry ? foundEntry.displayName : initialName;
      this.timezoneSelected.emit(this.selectedTimezoneName);
    }
  }

  private getFormattedOffset(timeZone: string): string {
    try {
      const now = new Date();
      // Intl.DateTimeFormat es la forma estándar de obtener esta información.
      // 'en' se usa como un locale base, el formato del offset es estándar (GMT±HH:MM).
      const formatter = new Intl.DateTimeFormat('en', {
        timeZoneName: 'longOffset', // Solicita el offset en formato GMT±HH:MM
        timeZone: timeZone,
        // Se requiere al menos un campo de fecha/hora para que timeZoneName funcione correctamente
        hour: 'numeric', // Podría ser cualquier otro campo como year: 'numeric'
      });
      const parts = formatter.formatToParts(now);
      const offsetPart = parts.find(part => part.type === 'timeZoneName');
      if (offsetPart && offsetPart.value.startsWith('GMT')) {
        return offsetPart.value; // Ej: "GMT+02:00" o "GMT-05:00"
      }
      // console.warn(`No se pudo obtener el offset GMT para ${timeZone}, se obtuvo: ${offsetPart?.value}`);
      return ''; // Fallback si no se obtiene el formato esperado
    } catch (error) {
      // console.warn(`Error al obtener el offset para ${timeZone}:`, error);
      return '';
    }
  }

  private groupTimezonesByContinent(timezoneNames: string[]): void {
    const groups: { [key: string]: TimezoneEntry[] } = {};
    timezoneNames.forEach(tzName => {
      const offset = this.getFormattedOffset(tzName);
      const displayName = offset ? `${tzName} (${offset})` : tzName;
      const entry: TimezoneEntry = { name: tzName, displayName };

      const parts = tzName.split('/');
      const continent = parts[0];

      if (parts.length > 1) {
        if (!groups[continent]) {
          groups[continent] = [];
        }
        groups[continent].push(entry);
      } else {
        if (!groups['Otros']) {
          groups['Otros'] = [];
        }
        groups['Otros'].push(entry);
      }
    });

    this.groupedTimezones = Object.keys(groups)
      .sort()
      .map(continent => ({
        continent,
        timezones: groups[continent].sort((a, b) => a.displayName.localeCompare(b.displayName))
      }));
  }

  private findTimezoneEntry(timezoneName: string): TimezoneEntry | undefined {
    for (const group of this.groupedTimezones) {
      const found = group.timezones.find(tz => tz.name === timezoneName);
      if (found) return found;
    }
    return undefined;
  }

  onTimezoneChange(tzEntry: TimezoneEntry): void {
    this.selectedTimezoneName = tzEntry.name;
    this.selectedTimezoneDisplay = tzEntry.displayName;
    this.timezoneSelected.emit(this.selectedTimezoneName);
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
