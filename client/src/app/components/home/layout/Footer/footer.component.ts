import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../../../services/language.service';
import { TranslatePipe } from '../../../../pipe/translate.pipe';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe
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
