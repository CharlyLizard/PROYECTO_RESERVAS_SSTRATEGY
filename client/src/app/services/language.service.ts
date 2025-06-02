import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface Language {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSignal = signal<string>('es'); // Idioma por defecto
  private translationsSignal = signal<Record<string, string>>({});

  // Lista de idiomas disponibles. Puedes obtenerla de una configuración o API si es necesario.
  availableLanguages: Language[] = [
    { code: 'en', name: 'Español' },
    { code: 'es', name: 'English' },
  ];

  constructor(private http: HttpClient) {
    const lang = this.getCurrentLanguageCode();
    this.setLanguage(lang); // Esto debe cargar las traducciones del idioma por defecto
  }

  setLanguage(langCode: string): void {
    if (this.availableLanguages.some(l => l.code === langCode) && langCode !== this.currentLanguageSignal()) {
      this.currentLanguageSignal.set(langCode);
      this.loadTranslations(langCode);
    }
  }

  getCurrentLanguageCode(): string {
    return this.currentLanguageSignal();
  }

  getCurrentLanguageSignal() {
    return this.currentLanguageSignal.asReadonly();
  }

  private loadTranslations(lang: string): void {
    this.http.get<Record<string, string>>(`/assets/i18n/${lang}.json`)
      .pipe(
        catchError(() => {
          console.error(`Traducciones para '${lang}' no encontradas. Cargando 'es' por defecto.`);
          if (lang !== 'es') {
            return this.http.get<Record<string, string>>(`/assets/i18n/es.json`);
          }
          return of({});
        }),
        tap(data => this.translationsSignal.set(data))
      ).subscribe();
  }

  getTranslation(key: string): string {
    const translation = this.translationsSignal()[key];
    return translation || key;
  }
}
