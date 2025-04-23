import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'zona-horaria',
  imports: [MatSelectModule,CommonModule],
  templateUrl: './zona-horaria.component.html'
})
export class ZonaHorariaComponent {
  @Input() initialTimezone: string | null = null;
  @Output() timezoneChange = new EventEmitter<string>();

  selectedTimezone: string | null = null;

  timezonesByContinent = [
    {
      continent: 'Europa',
      timezones: [
        { name: 'Madrid', offset: '+1:00' },
        { name: 'Londres', offset: '0:00' }
      ]
    },
    {
      continent: 'América',
      timezones: [
        { name: 'New York', offset: '-5:00' },
        { name: 'Los Ángeles', offset: '-8:00' }
      ]
    },
    {
      continent: 'Asia',
      timezones: [
        { name: 'Tokyo', offset: '+9:00' },
        { name: 'Beijing', offset: '+8:00' }
      ]
    }
  ];

  ngOnInit() {
    if (this.initialTimezone) {
      this.selectedTimezone = this.initialTimezone;
    }
  }

  onTimezoneSelected(timezone: string) {
    this.selectedTimezone = timezone;
    this.timezoneChange.emit(timezone);
  }
}
