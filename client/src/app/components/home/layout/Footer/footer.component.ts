import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../../../services/language.service';
import { TranslatePipe } from '../../../../pipe/translate.pipe';
=======
import { CommonModule } from '@angular/common'; // Para *ngFor
import { RouterLink } from '@angular/router'; // Importar RouterLink
import { LanguageService, Language } from '../../../../services/language.service'; // Tu servicio de idioma
import { TranslatePipe } from '../../../../pipe/translate.pipe'; // Tu pipe de traducción personalizada
>>>>>>> fe71ad993a86c23b9c0e78d4359e4247e7cad7aa

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
<<<<<<< HEAD
    CommonModule,
    TranslatePipe
=======
    CommonModule,    // Necesario para directivas como *ngFor
    RouterLink,      // Añadir RouterLink para la directiva routerLink
    TranslatePipe    // Tu pipe de traducción personalizada
>>>>>>> fe71ad993a86c23b9c0e78d4359e4247e7cad7aa
  ]
})
export class FooterComponent implements OnInit {
  languages: Language[] = [];
  currentLang: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languages = this.languageService.availableLanguages;
    this.currentLang = this.languageService.getCurrentLanguageCode();
  }

  changeLang(event: Event): void {
    const langCode = (event.target as HTMLSelectElement)?.value;
    if (langCode) {
      this.languageService.setLanguage(langCode);
      this.currentLang = langCode;
    }
  }
}
