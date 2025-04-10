import { Client } from '../../models/users/client.model';

export interface Appointment {
  id: number; // ID único de la cita
  client: Client; // Información del cliente asociado
  date: string; // Fecha de la cita (en formato ISO)
  time: string; // Hora de la cita
  timezone: string; // Zona horaria
  service: string; // Servicio solicitado
  notes?: string; // Notas adicionales (opcional)
}
