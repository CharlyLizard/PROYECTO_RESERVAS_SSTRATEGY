import { Client } from '../../models/users/client.model';

export interface Appointment {
  id?: number;
  client: Client;
  date: string;
  time: string;
  timezone: string;
  service: string;
  notes?: string;
}
