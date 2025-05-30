import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  dateForNewAppointment: string = '';
  currentAppointmentToEdit: any | null = null;

  citas: any[] = [];

  constructor(
    private reservasDataService: ReservasDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAppointmentsForCalendar();
  }

  private parseAmPmTime(timeStr: string | null | undefined): string {
    if (!timeStr) return '00:00:00';
    const amPmMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (amPmMatch) {
        let hours = parseInt(amPmMatch[1], 10);
        const minutes = parseInt(amPmMatch[2], 10);
        const modifier = amPmMatch[3].toUpperCase();

        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
    }
    const timeParts = timeStr.split(':');
    if (timeParts.length >= 2) {
        const h = parseInt(timeParts[0], 10);
        const m = parseInt(timeParts[1], 10);
        if (!isNaN(h) && !isNaN(m)) {
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${(timeParts[2] || '00').padStart(2, '0')}`;
        }
    }
    return '00:00:00';
  }

  private convertToAmPm(time24: string): string {
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

        this.calendarOptions = { ...this.calendarOptions, events: calendarEvents as any[] };
        this.cdr.detectChanges();
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
        this.loadAppointmentsForCalendar();
        this.closeAppointmentFormModal();
      },
      error: (err: any) => console.error(`Error ${this.appointmentFormMode === 'add' ? 'creating' : 'updating'} appointment`, err)
    });
  }

  handleDeleteAppointmentRequest(appointmentId: number) {
    console.log(`Solicitud para eliminar cita con ID: ${appointmentId}`);
    if (!appointmentId) {
      console.error('Error: Se intentó eliminar una cita sin ID.');
      return;
    }
    this.reservasDataService.gestionarAppointment('delete', { id: appointmentId }).subscribe({
      next: () => {
        console.log(`Cita con ID: ${appointmentId} eliminada exitosamente.`);
        this.loadAppointmentsForCalendar();
        this.closeAppointmentDetailModal();
      },
      error: (err: any) => {
        console.error(`Error al eliminar la cita con ID: ${appointmentId}`, err);
      }
    });
  }

  closeAppointmentFormModal(): void {
    this.isAppointmentFormModalVisible = false;
    this.currentAppointmentToEdit = null;
    this.dateForNewAppointment = '';
    this.cdr.detectChanges();
  }

  guardarModalCita(appointmentData: any) {

    const payload = {
      clientId: appointmentData.clientId,
      serviceId: appointmentData.serviceId,
      date: appointmentData.date,
      time: this.convertToAmPm(appointmentData.time),
      timezone: appointmentData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      notes: appointmentData.notes || ''
    };
    if (this.appointmentFormMode === 'edit' && this.currentAppointmentToEdit?.id) {
      (payload as any).id = this.currentAppointmentToEdit.id;
    }

    this.reservasDataService.gestionarAppointment(this.appointmentFormMode, payload).subscribe({
      next: (resp: { appointments: any[] }) => {
        console.log(`Cita ${this.appointmentFormMode}d exitosamente.`);
        this.closeAppointmentFormModal();
        this.loadAppointmentsForCalendar();
      },
      error: (err: any) => {
        console.error(`Error al ${this.appointmentFormMode} la cita:`, err);
      }
    });
  }
}
