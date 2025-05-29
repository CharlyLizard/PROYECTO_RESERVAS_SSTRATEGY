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
    // Añade más idiomas aquí según tus archivos de traducción
  ];

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLanguageSignal());
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
    return this.currentLanguageSignal.asReadonly(); // Exponer como readonly para evitar modificaciones externas
  }

  private loadTranslations(lang: string): void {
    this.http.get<Record<string, string>>(`/assets/i18n/${lang}.json`)
      .pipe(
        catchError(() => {
          console.error(`Traducciones para '${lang}' no encontradas. Cargando 'es' por defecto.`);
          if (lang !== 'es') { // Evitar bucle si 'es.json' también falla
            return this.http.get<Record<string, string>>(`/assets/i18n/es.json`);
          }
          return of({}); // Fallback final a un objeto vacío
        }),
        tap(data => this.translationsSignal.set(data))
      ).subscribe();
  }

  getTranslation(key: string): string {
    const translation = this.translationsSignal()[key];
    return translation || key; // Devuelve la clave si no se encuentra la traducción
  }
}
