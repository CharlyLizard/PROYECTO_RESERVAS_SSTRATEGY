import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { ReservasDataService } from '../../../../services/reservas-data.service';
import { AppointmentDetailModalComponent } from './appointment-detail-modal/appointment-detail-modal.component'; // Importa el nuevo modal
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Agrega CommonModule
    FullCalendarModule,
    AppointmentDetailModalComponent // Agrega el nuevo modal a los imports
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
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    // eventDrop: this.handleEventDrop.bind(this), // Opcional
    // eventResize: this.handleEventResize.bind(this) // Opcional
  };

  isDetailModalVisible = false;
  selectedAppointmentForModal: any = null;

  constructor(private reservasDataService: ReservasDataService) {}

  ngOnInit(): void {
    this.loadAppointmentsForCalendar();
  }

  private parseAmPmTime(timeStr: string | null | undefined): string {
    if (!timeStr || !timeStr.includes(' ') || !timeStr.includes(':')) {
      return '00:00:00'; // Default for invalid format
    }
    try {
      const parts = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!parts) {
        return '00:00:00';
      }
      let hours = parseInt(parts[1], 10);
      const minutes = parseInt(parts[2], 10);
      const modifier = parts[3].toUpperCase();

      if (isNaN(hours) || isNaN(minutes)) {
        return '00:00:00';
      }

      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) { // Midnight case: 12 AM should be 00 hours
        hours = 0;
      }

      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes}:00`; // HH:mm:ss
    } catch (e) {
      return '00:00:00';
    }
  }

  loadAppointmentsForCalendar(): void {
    this.reservasDataService.getAllAppointmentsWithDetails().subscribe(
      (appointments: any[]) => {
        const calendarEvents = appointments.map(app => {
          if (!app.date) {
            return null; // Skip si no hay fecha
          }

          let eventTitle = 'Cita'; // Título por defecto
          if (app.service && app.client) {
            eventTitle = `${app.service.name} - ${app.client.name}`;
          } else if (app.service) {
            eventTitle = app.service.name;
          } else if (app.client) {
            eventTitle = `Cita con ${app.client.name}`;
          }

          const datePart = app.date.substring(0, 10); // Extrae YYYY-MM-DD de la cadena ISO
          const timePart24Hour = this.parseAmPmTime(app.time); // Parsea "HH:mm AM/PM" a "HH:mm:ss"

          const eventStart = `${datePart}T${timePart24Hour}`;

          return {
            title: eventTitle,
            start: eventStart, // Combina la fecha con la hora parseada
            color: app.service?.color || '#3788D8',
            extendedProps: {
              appointmentDetails: app
            }
          };
        }).filter(event => event !== null); // Filtra los eventos nulos

        this.calendarOptions = { ...this.calendarOptions, events: calendarEvents as any[] };
      },
      error => {
        console.error('Error fetching appointments for calendar:', error);
      }
    );
  }

  handleDateSelect(selectInfo: any) {
    const title = prompt('Por favor, ingrese un título para su nuevo evento:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: any) {
    this.selectedAppointmentForModal = clickInfo.event.extendedProps.appointmentDetails;
    this.isDetailModalVisible = true;
  }

  closeAppointmentDetailModal(): void {
    this.isDetailModalVisible = false;
    this.selectedAppointmentForModal = null;
  }

  // Opcional: Implementa handleEventDrop y handleEventResize si necesitas guardar cambios
  // handleEventDrop(dropInfo: any) {
  //   console.log('Evento movido:', dropInfo.event);
  // }

  // handleEventResize(resizeInfo: any) {
  //   console.log('Evento redimensionado:', resizeInfo.event);
  // }
}

let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}
