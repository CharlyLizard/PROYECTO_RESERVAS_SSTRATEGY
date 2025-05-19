import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { ReservasDataService } from '../../../../services/reservas-data.service';
import { AppointmentDetailModalComponent } from './appointment-detail-modal/appointment-detail-modal.component';
import { AppointmentFormModalComponent, AppointmentFormData } from './appointment-form-modal/appointment-form-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  imports: [
    CommonModule,
    FullCalendarModule,
    AppointmentDetailModalComponent,
    AppointmentFormModalComponent
  ]
})
export class AdminCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    editable: true,
    selectable: true,
    select: (selectInfo: DateSelectArg) => this.handleDateSelect(selectInfo),
    eventClick: (clickInfo: EventClickArg) => this.handleEventClick(clickInfo)
  };

  isDetailModalVisible = false;
  selectedAppointmentForModal: any = null;

  isAppointmentFormModalVisible = false;
  appointmentFormMode: 'add' | 'edit' = 'add';
  dateForNewAppointment: string = ''; // YYYY-MM-DD
  currentAppointmentToEdit: any | null = null;

  citas: any[] = []; // Añade esto si quieres almacenar las citas en el componente

  constructor(
    private reservasDataService: ReservasDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAppointmentsForCalendar(); // Load events so eventClick can be tested
  }

  private parseAmPmTime(timeStr: string | null | undefined): string {
    if (!timeStr) return '00:00:00';
    // Robust parsing for "HH:mm AM/PM"
    const amPmMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (amPmMatch) {
        let hours = parseInt(amPmMatch[1], 10);
        const minutes = parseInt(amPmMatch[2], 10);
        const modifier = amPmMatch[3].toUpperCase();

        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0; // Midnight case

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    }
    // Fallback for "HH:mm:ss" or "HH:mm"
    const timeParts = timeStr.split(':');
    if (timeParts.length >= 2) {
        const h = parseInt(timeParts[0], 10);
        const m = parseInt(timeParts[1], 10);
        if (!isNaN(h) && !isNaN(m)) {
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${(timeParts[2] || '00').padStart(2, '0')}`;
        }
    }
    return '00:00:00'; // Default if parsing fails
  }

  private convertToAmPm(time24: string): string { // time24 is HH:mm
    if (!time24) return '';
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    if (isNaN(hours) || isNaN(minutes)) return '';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

  loadAppointmentsForCalendar(): void {
    this.reservasDataService.getAllAppointmentsWithDetails().subscribe(
      (appointments: any[]) => {
        const calendarEvents = appointments.map(app => {
          if (!app.date) return null;
          let eventTitle = 'Cita';
          if (app.service && app.client) eventTitle = `${app.service.name} - ${app.client.name}`;
          else if (app.service) eventTitle = app.service.name;
          else if (app.client) eventTitle = `Cita con ${app.client.name}`;

          const datePart = app.date.substring(0, 10);
          const timePart24Hour = this.parseAmPmTime(app.time);
          const eventStart = `${datePart}T${timePart24Hour}`;

          return {
            title: eventTitle,
            start: eventStart,
            color: app.service?.color || '#3788D8',
            extendedProps: { appointmentDetails: app }
          };
        }).filter(event => event !== null);

        // Update calendarOptions events and trigger change detection
        this.calendarOptions = { ...this.calendarOptions, events: calendarEvents as any[] };
        this.cdr.detectChanges(); // Explicitly trigger change detection
      },
      error => console.error('Error fetching appointments for calendar:', error)
    );
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    console.log('handleDateSelect triggered. Date:', selectInfo.startStr);
    this.dateForNewAppointment = selectInfo.startStr.substring(0, 10);
    this.appointmentFormMode = 'add';
    this.currentAppointmentToEdit = null;
    this.isAppointmentFormModalVisible = true;
    console.log('isAppointmentFormModalVisible set to true for ADD mode');
    this.cdr.detectChanges();
  }

  handleEventClick(clickInfo: EventClickArg): void {
    console.log('handleEventClick triggered. Event:', clickInfo.event.title);
this.selectedAppointmentForModal = clickInfo.event.extendedProps['appointmentDetails'];    if (!this.selectedAppointmentForModal) {
        console.error('Error: appointmentDetails not found in event extendedProps.');
        return;
    }
    this.isDetailModalVisible = true;
    console.log('isDetailModalVisible set to true');
    this.cdr.detectChanges();
  }

  closeAppointmentDetailModal(): void {
    this.isDetailModalVisible = false;
    this.selectedAppointmentForModal = null;
    this.cdr.detectChanges();
  }

  handleModifyAppointmentRequest(appointmentData: any): void {
    console.log('handleModifyAppointmentRequest triggered. Data:', appointmentData);
    this.closeAppointmentDetailModal();

    this.currentAppointmentToEdit = appointmentData;
    this.appointmentFormMode = 'edit';
    this.isAppointmentFormModalVisible = true;
    console.log('isAppointmentFormModalVisible set to true for EDIT mode');
    this.cdr.detectChanges();
  }

  handleSaveAppointment(formData: AppointmentFormData): void {
    console.log('handleSaveAppointment called with data:', formData);
    const dtoPayload = {
      id: this.appointmentFormMode === 'edit' ? formData.id : undefined,
      clientId: formData.clientId,
      serviceId: formData.serviceId,
      date: formData.date,
      time: this.convertToAmPm(formData.time),
      timezone: formData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      notes: formData.notes || ''
    };

    const operation = this.appointmentFormMode === 'add'
      ? this.reservasDataService.createAppointment(dtoPayload)
      : this.reservasDataService.updateAppointment(dtoPayload.id!, dtoPayload);

    operation.subscribe({
      next: () => {
        console.log(`Appointment ${this.appointmentFormMode === 'add' ? 'created' : 'updated'} successfully`);
        this.loadAppointmentsForCalendar(); // Reload appointments to show changes
        this.closeAppointmentFormModal();
      },
      error: (err: any) => console.error(`Error ${this.appointmentFormMode === 'add' ? 'creating' : 'updating'} appointment`, err)
    });
  }

  closeAppointmentFormModal(): void {
    this.isAppointmentFormModalVisible = false;
    this.currentAppointmentToEdit = null;
    this.dateForNewAppointment = '';
    this.cdr.detectChanges();
  }

  guardarModalCita(appointment: any) {
    this.reservasDataService.gestionarAppointment(this.appointmentFormMode, appointment).subscribe((resp: { appointments: any[] }) => {
      this.citas = resp.appointments;
      this.closeAppointmentFormModal();
      this.loadAppointmentsForCalendar(); // Para refrescar el calendario
    });
  }
}
