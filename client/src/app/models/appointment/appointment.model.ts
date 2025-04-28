import { Client } from '../../models/users/client.model';

export interface Appointment {
  id?: number;
  client: Client;
  date: string;
  time: string;
  timezone: string;
  service: number | null; // Cambiado a number para que coincida con el id del servicio
  notes?: string;
}
