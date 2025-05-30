import { Injectable, signal, WritableSignal, Signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ConfigGeneral } from '../../models/admin/config-general.model';
import { LogicaNegocioConfig, Horario, PeriodoDescanso } from '../../components/settings/logica-negocio/logica-negocio.component';

const DEFAULT_LOGICA_NEGOCIO_CONFIG: LogicaNegocioConfig = {
  horarioLaboral: [
    { dia: 'Domingo', inicio: '', final: '' },
    { dia: 'Lunes', inicio: '09:00', final: '17:00' },
    { dia: 'Martes', inicio: '09:00', final: '17:00' },
    { dia: 'Miércoles', inicio: '09:00', final: '17:00' },
    { dia: 'Jueves', inicio: '09:00', final: '17:00' },
    { dia: 'Viernes', inicio: '09:00', final: '17:00' },
    { dia: 'Sábado', inicio: '', final: '' }
  ],
  periodosDescanso: [],
  estadosCitas: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada', 'No Asistió']
};

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private apiUrl = 'http://localhost:8080/api/configuracion';

  private logicaNegocioConfigSignal: WritableSignal<LogicaNegocioConfig>;

  public readonly currentLogicaNegocioConfig: Signal<LogicaNegocioConfig>;

  constructor(private http: HttpClient) {
    const storedConfig = localStorage.getItem('logicaNegocioConfig');
    this.logicaNegocioConfigSignal = signal(storedConfig ? JSON.parse(storedConfig) : DEFAULT_LOGICA_NEGOCIO_CONFIG);
    this.currentLogicaNegocioConfig = this.logicaNegocioConfigSignal.asReadonly();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getGeneralConfig(): Observable<ConfigGeneral> {
    return this.http.get<ConfigGeneral>(`${this.apiUrl}/general`, { headers: this.getHeaders() });
  }

  saveGeneralConfig(config: Omit<ConfigGeneral, 'selectedFile'>): Observable<ConfigGeneral> {
    return this.http.post<ConfigGeneral>(`${this.apiUrl}/general`, config, { headers: this.getHeaders() });
  }

  uploadLogo(file: File): Observable<{ logotipoUrl: string }> {
    const formData = new FormData();
    formData.append('logo', file, file.name);
    return this.http.post<{ logotipoUrl: string }>(`${this.apiUrl}/general/logo`, formData, {
      headers: this.getHeaders()
    });
  }

  getLogicaNegocioConfig(): Observable<LogicaNegocioConfig> {
    return of(this.logicaNegocioConfigSignal());
  }

  saveLogicaNegocioConfig(config: LogicaNegocioConfig): Observable<LogicaNegocioConfig> {
    this.logicaNegocioConfigSignal.set(config);
    localStorage.setItem('logicaNegocioConfig', JSON.stringify(config));
    console.log('Lógica de negocio actualizada en signal y localStorage:', config);
    return of(config);
  }


  /**
   * Verifica si un intervalo de tiempo específico está disponible según la configuración.
   * @param date Fecha de la cita
   * @param time Hora de inicio de la cita (formato "HH:mm")
   * @param serviceDurationMinutes Duración del servicio en minutos
   * @returns boolean Verdadero si está disponible, falso si no.
   */
  public isTimeSlotAvailable(date: Date, time: string, serviceDurationMinutes: number): boolean {
    const config = this.logicaNegocioConfigSignal();
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayName = dayNames[date.getDay()];

    const horarioDia = config.horarioLaboral.find(h => h.dia === dayName);

    if (!horarioDia || !horarioDia.inicio || !horarioDia.final) {
      console.log(`Día ${dayName} no laborable o sin horario definido.`);
      return false;
    }

    const requestedStartTimeInMinutes = this.timeToMinutes(time);
    const requestedEndTimeInMinutes = requestedStartTimeInMinutes + serviceDurationMinutes;

    const workStartTimeInMinutes = this.timeToMinutes(horarioDia.inicio);
    const workEndTimeInMinutes = this.timeToMinutes(horarioDia.final);

    if (requestedStartTimeInMinutes < workStartTimeInMinutes || requestedEndTimeInMinutes > workEndTimeInMinutes) {
      console.log(`Cita ${time} fuera del horario laboral (${horarioDia.inicio} - ${horarioDia.final}) para ${dayName}.`);
      return false;
    }

    for (const descanso of config.periodosDescanso) {
      if (descanso.dia === dayName && descanso.inicio && descanso.final) {
        const descansoStartInMinutes = this.timeToMinutes(descanso.inicio);
        const descansoEndInMinutes = this.timeToMinutes(descanso.final);

        if (requestedStartTimeInMinutes < descansoEndInMinutes && requestedEndTimeInMinutes > descansoStartInMinutes) {
          console.log(`Cita ${time} coincide con descanso (${descanso.inicio} - ${descanso.final}) para ${dayName}.`);
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Convierte una hora en formato "HH:mm" a minutos desde la medianoche.
   */
  private timeToMinutes(timeStr: string): number {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Genera una lista de horarios disponibles para una fecha y duración de servicio dadas.
   * @param date Fecha para la cual generar horarios.
   * @param serviceDurationMinutes Duración del servicio.
   * @param intervalMinutes Intervalo entre posibles horarios (ej. 15, 30).
   * @returns Array de strings con los horarios disponibles en formato "HH:mm".
   */
  public getAvailableTimeSlots(date: Date, serviceDurationMinutes: number, intervalMinutes: number = 30): string[] {
    const config = this.logicaNegocioConfigSignal();
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const dayName = dayNames[date.getDay()];
    const horarioDia = config.horarioLaboral.find(h => h.dia === dayName);

    if (!horarioDia || !horarioDia.inicio || !horarioDia.final) {
      return [];
    }

    const availableSlots: string[] = [];
    const workStartMinutes = this.timeToMinutes(horarioDia.inicio);
    const workEndMinutes = this.timeToMinutes(horarioDia.final);

    for (let currentTime = workStartMinutes; currentTime < workEndMinutes; currentTime += intervalMinutes) {
      const slotStartTimeStr = this.minutesToTime(currentTime);
      if (this.isTimeSlotAvailable(date, slotStartTimeStr, serviceDurationMinutes)) {
        if ((currentTime + serviceDurationMinutes) <= workEndMinutes) {
            availableSlots.push(slotStartTimeStr);
        }
      }
    }
    return availableSlots;
  }

   /**
   * Convierte minutos desde la medianoche a formato "HH:mm".
   */
  private minutesToTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
