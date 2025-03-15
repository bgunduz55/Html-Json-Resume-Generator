import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  readonly languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
  ];

  constructor(private translate: TranslateService) {
    // Initialize with browser language or default to English
    const browserLang = translate.getBrowserLang();
    const defaultLang = browserLang && ['en', 'tr'].includes(browserLang) ? browserLang : 'en';
    
    this.setLanguage(defaultLang);
  }

  setLanguage(langCode: string): void {
    if (this.languages.find(lang => lang.code === langCode)) {
      this.translate.use(langCode);
      this.currentLanguageSubject.next(langCode);
      localStorage.setItem('preferredLanguage', langCode);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getLanguages(): Language[] {
    return this.languages;
  }
} 