import { Pipe, PipeTransform, ChangeDetectorRef, inject, OnDestroy } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private languageService = inject(LanguageService);
  private cdr = inject(ChangeDetectorRef);
  private langChangeSubscription: Subscription;
  private lastKey: string | null = null;
  private lastValue: string = '';

  constructor() {
    this.langChangeSubscription = toObservable(this.languageService.getCurrentLanguageSignal())
      .subscribe(() => {
        if (this.lastKey) {
          this.lastValue = this.languageService.getTranslation(this.lastKey);
          this.cdr.markForCheck();
        }
      });
  }

  transform(key: string): string {
    if (key !== this.lastKey) {
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
