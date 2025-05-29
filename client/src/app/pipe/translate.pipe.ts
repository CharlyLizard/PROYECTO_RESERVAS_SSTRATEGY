import { Pipe, PipeTransform, ChangeDetectorRef, inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // Necesario para que el pipe se actualice cuando cambie el idioma o las traducciones
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private languageService = inject(LanguageService);
  private cdr = inject(ChangeDetectorRef);
  private langChangeSubscription: Subscription;
  private lastKey: string | null = null;
  private lastValue: string = '';

  constructor() {
    // Suscribirse a los cambios de idioma para forzar la actualización del pipe
    this.langChangeSubscription = toObservable(this.languageService.getCurrentLanguageSignal())
      .subscribe(() => {
        if (this.lastKey) { // Si ya se ha traducido una clave antes
          this.lastValue = this.languageService.getTranslation(this.lastKey);
          this.cdr.markForCheck(); // Marcar para la detección de cambios
        }
      });
  }

  transform(key: string): string {
    if (key !== this.lastKey) { // Si la clave es nueva o diferente
      this.lastKey = key;
      this.lastValue = this.languageService.getTranslation(key);
    }
    return this.lastValue;
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
