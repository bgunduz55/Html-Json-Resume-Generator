import { Component, OnInit, OnDestroy } from '@angular/core';
import { LanguageService, Language } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  languages: Language[] = [];
  currentLanguage: string = 'en';
  selectedLanguage: Language | undefined;
  private subscription: Subscription;

  constructor(private languageService: LanguageService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.languages = this.languageService.getLanguages();
    this.subscription.add(
      this.languageService.currentLanguage$.subscribe(langCode => {
        this.currentLanguage = langCode;
        this.selectedLanguage = this.languages.find(lang => lang.code === langCode);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLanguageChange(langCode: string): void {
    this.languageService.setLanguage(langCode);
  }
} 