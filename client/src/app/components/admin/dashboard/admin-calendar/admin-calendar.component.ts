import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar module
import dayGridPlugin from '@fullcalendar/daygrid'; // DayGrid plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // TimeGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // Interaction plugin

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
  standalone: true,
  imports: [FullCalendarModule]
})
export class AdminCalendarComponent {
  calendarOptions: any;

  constructor() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,timeGridDay'
      },
      events: [
        {
          title: 'Cita 1',
          start: '2025-04-06T10:00:00',
          end: '2025-04-06T11:00:00'
        },
        {
          title: 'Cita 2',
          start: '2025-04-07T14:00:00',
          end: '2025-04-07T15:00:00'
        }
      ],
      editable: true,
      selectable: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this)
    };
  }

  handleDateSelect(selectInfo: any) {
    const title = prompt('Ingrese el título del evento:');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: any) {
    if (confirm(`¿Desea eliminar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  }
}
