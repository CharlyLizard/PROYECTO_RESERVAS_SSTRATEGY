import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

export interface GoogleCalendarModalDetails {
  serviceName: string;
  date: Date;
  time: string;
}

@Component({
  selector: 'app-google-calendar-modal',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './google-calendar-modal.component.html',
})
export class GoogleCalendarModalComponent {
  @Input() appointmentDetails: GoogleCalendarModalDetails | null = null;

  @Output() addToCalendarAndConfirm = new EventEmitter<void>();
  @Output() confirmOnly = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onAddToCalendarAndConfirm(): void {
    this.addToCalendarAndConfirm.emit();
  }

  onConfirmOnly(): void {
    this.confirmOnly.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
