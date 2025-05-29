import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor
import { LanguageService, Language } from '../../../../services/language.service'; // Tu servicio de idioma
import { TranslatePipe } from '../../../../pipe/translate.pipe'; // Tu pipe de traducción personalizada

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    CommonModule,    // Necesario para directivas como *ngFor
    TranslatePipe    // Tu pipe de traducción personalizada
  ]
})
export class FooterComponent implements OnInit {
  languages: Language[] = [];
  currentLang: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languages = this.languageService.availableLanguages;
    this.currentLang = this.languageService.getCurrentLanguageCode();

    // Opcional: Suscribirse a cambios en el idioma si se puede cambiar desde otro lugar
    // y quieres que el desplegable lo refleje.
    // this.languageService.getCurrentLanguageSignal().subscribe(langCode => {
    //   this.currentLang = langCode;
    // });
  }

  changeLang(event: Event): void {
    const langCode = (event.target as HTMLSelectElement)?.value;
    if (langCode) {
      this.languageService.setLanguage(langCode);
      this.currentLang = langCode; // Actualiza el idioma actual en el componente
    }
  }
}
