import { Component, effect, ViewChild } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { FirstWindowComponent } from '../FirstWindow/first-window.component';
import { HeaderComponent } from '../../Header/header.component';
import { SecondWindowComponent } from '../second-window/second-window.component';
import { ReservasDataService } from '../../../../../services/reservas-data.service';
import { ThirdWindowComponent } from '../third-window/third-window.component';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../../../services/api/api.service';
import { Appointment } from '../../../../../models/appointment/appointment.model';
import { Servicio } from '../../../../../models/servicios/servicio';
import {
  GoogleCalendarModalComponent,
  GoogleCalendarModalDetails,
} from '../google-calendar-modal/google-calendar-modal.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  imports: [
    FirstWindowComponent,
    HeaderComponent,
    SecondWindowComponent,
    CommonModule,
    ThirdWindowComponent,
    MatIconModule,
    GoogleCalendarModalComponent
  ],
})
export class StepperComponent {
  currentStep = 0;

  @ViewChild(SecondWindowComponent)
  secondWindowComponent!: SecondWindowComponent;
  showGoogleCalendarModal = false;
  currentAppointmentForModal: Appointment | null = null;
  currentServiceForModal: Servicio | null = null;
  modalDetails: GoogleCalendarModalDetails | null = null;

  constructor(
    private reservasService: ReservasDataService,
    private ApiService: ApiService
  ) {
    effect(() => {
      const response = this.ApiService.reservationResponse();
      if (response) {
        // Esta lógica se activará cuando la reserva se complete exitosamente
        // Podrías mover el alert y el reset aquí si prefieres
        console.log('Respuesta del servidor (desde effect):', response);
      }
    });
  }

  // Avanzar al siguiente paso
  nextStep(): void {
    // Si estamos en el paso del formulario (paso 1), guardar los datos antes de avanzar
    if (this.currentStep === 1 && this.secondWindowComponent) {
      this.secondWindowComponent.saveData();
    }

    if (this.canProceed() && this.currentStep < 2) {
      this.currentStep++;
    }
  }

  // Retroceder al paso anterior
  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Método para verificar si se puede avanzar al siguiente paso
  canProceed(): boolean {
    if (this.currentStep === 0) {
      return this.reservasService.isFirstStepComplete();
    } else if (this.currentStep === 1) {
      // Si tenemos referencia al componente, verificar si el formulario es válido
      return this.secondWindowComponent
        ? this.secondWindowComponent.isFormValid()
        : false;
    }

    return true;
  }

  confirm(): void {
    const formData = this.reservasService.getContactInfo();
    const appointmentData = this.reservasService.getReservationDetails();
    const servicioSeleccionado = this.reservasService.getServicioSeleccionado();

    if (!servicioSeleccionado || !servicioSeleccionado.id) {
      alert('Debes seleccionar un servicio antes de confirmar la cita.');
      this.currentStep = 0; // O al paso de selección de servicio
      return;
    }

    if (!appointmentData.date || !appointmentData.hour) {
      alert('Debes seleccionar una fecha y hora para la cita.');
      this.currentStep = 0; // O al paso de selección de fecha/hora
      return;
    }

    const appointment: Appointment = {
      client: {
        name: `${formData.nombre || ''} ${formData.apellido || ''}`.trim(),
        email: formData.email,
        phone: formData.telefono,
        address: formData.domicilio || '',
        city: formData.ciudad || '',
        postalCode: formData.codigoPostal || '',
      },
      date: appointmentData.date.toISOString().split('T')[0], // Formato YYYY-MM-DD
      time: appointmentData.hour, // Formato HH:mm
      timezone:
        appointmentData.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      service: servicioSeleccionado.id, // Asegúrate que tu modelo Appointment espera serviceId
      notes: formData.notas || '',
      // providerId: ..., // Si aplica
      // status: 'Pendiente', // Si aplica
    };

    this.currentAppointmentForModal = appointment;
    this.currentServiceForModal = servicioSeleccionado;

    const esGmail =
      formData.email && formData.email.toLowerCase().endsWith('@gmail.com');

    if (esGmail) {
      this.modalDetails = {
        serviceName: servicioSeleccionado.nombre,
        date: appointmentData.date,
        time: appointmentData.hour,
      };
      this.showGoogleCalendarModal = true;
    } else {
      this.proceedToCreateAppointment(appointment);
    }
  }

  private proceedToCreateAppointment(appointment: Appointment): void {
    this.ApiService.sendReservationData(appointment)
      .then(() => {
        // Asumiendo que sendReservationData devuelve una Promise
        alert('¡Cita confirmada exitosamente!');
        this.reservasService.clearData(); // Cambiado de resetReservation a clearData
        this.currentStep = 0; // Volver al inicio o a una página de agradecimiento
        // this.router.navigate(['/ruta-confirmacion']);
      })
      .catch((error) => {
        console.error('Error al confirmar la cita:', error);
        alert(
          'Hubo un error al confirmar su cita. Por favor, inténtelo de nuevo.'
        );
      });
    this.showGoogleCalendarModal = false; // Asegúrate de cerrar el modal
  }

  handleAddToCalendarAndConfirm(): void {
    if (
      this.currentAppointmentForModal &&
      this.currentServiceForModal &&
      this.reservasService.getReservationDetails().date
    ) {
      const googleLink = this.constructGoogleCalendarLink(
        this.currentServiceForModal,
        this.reservasService.getReservationDetails().date!,
        this.currentAppointmentForModal.time,
        this.currentAppointmentForModal.notes
      );
      window.open(googleLink, '_blank');
      this.proceedToCreateAppointment(this.currentAppointmentForModal);
    }
    this.showGoogleCalendarModal = false;
  }

  handleConfirmOnly(): void {
    if (this.currentAppointmentForModal) {
      this.proceedToCreateAppointment(this.currentAppointmentForModal);
    }
    this.showGoogleCalendarModal = false;
  }

  handleModalCancel(): void {
    this.showGoogleCalendarModal = false;
    this.currentAppointmentForModal = null;
    this.currentServiceForModal = null;
    this.modalDetails = null;
  }

  private formatToGoogleCalendarDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00Z`;
  }

  private constructGoogleCalendarLink(
    servicio: Servicio,
    citaDate: Date, // La fecha de la cita (objeto Date)
    citaTime: string, // La hora en formato "HH:mm"
    notas?: string
  ): string {
    const tituloEvento = servicio.nombre;

    const fechaInicio = new Date(citaDate); // Clonar para no modificar la original
    const [horasInicio, minutosInicio] = citaTime.split(':').map(Number);
    fechaInicio.setHours(horasInicio, minutosInicio, 0, 0); // Establecer hora local

    const fechaFin = new Date(fechaInicio);
    const duracionMinutos = servicio.duracionMinutos || 60;
    fechaFin.setMinutes(fechaInicio.getMinutes() + duracionMinutos);

    // Google Calendar espera fechas en UTC para el formato YYYYMMDDTHHmmssZ
    const fechaInicioISO = this.formatToGoogleCalendarDate(fechaInicio);
    const fechaFinISO = this.formatToGoogleCalendarDate(fechaFin);

    const descripcionEvento = `Cita para ${servicio.nombre}.${
      notas ? `\nNotas: ${notas}` : ''
    }`;
    const ubicacionEvento = servicio.ubicacion || '';

    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const params = new URLSearchParams();
    params.append('text', tituloEvento);
    params.append('dates', `${fechaInicioISO}/${fechaFinISO}`);
    if (descripcionEvento) {
      params.append('details', descripcionEvento);
    }
    if (ubicacionEvento) {
      params.append('location', ubicacionEvento);
    }
    // params.append('crm', 'BUSY'); // Opcional: marcar como ocupado
    // params.append('trp', 'false'); // Opcional: no mostrar como transparente

    return `${baseUrl}&${params.toString()}`;
  }
}
