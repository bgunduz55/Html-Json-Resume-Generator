import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit, OnDestroy {
  themes: Theme[] = [];
  currentTheme: Theme;
  showCustomizer = false;
  private subscription: Subscription;

  customTheme: Partial<Theme> = {
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      background: '#ffffff',
      text: '#2c3e50',
      accent: '#3498db'
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
      headingFont: 'Montserrat, sans-serif',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    spacing: {
      sectionGap: '2rem',
      elementGap: '1rem',
      contentPadding: '2rem'
    }
  };

  constructor(private themeService: ThemeService) {
    this.currentTheme = themeService.getCurrentTheme();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.themes = this.themeService.getThemes();
    this.subscription.add(
      this.themeService.currentTheme$.subscribe(theme => {
        this.currentTheme = theme;
        this.customTheme = {
          colors: { ...theme.colors },
          typography: { ...theme.typography },
          spacing: { ...theme.spacing }
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onThemeChange(themeId: string): void {
    this.themeService.setTheme(themeId);
  }

  toggleCustomizer(): void {
    this.showCustomizer = !this.showCustomizer;
  }

  updateCustomTheme(): void {
    this.themeService.customizeTheme(this.currentTheme.id, this.customTheme);
  }

  resetTheme(): void {
    this.themeService.setTheme(this.currentTheme.id);
    this.customTheme = {
      colors: { ...this.currentTheme.colors },
      typography: { ...this.currentTheme.typography },
      spacing: { ...this.currentTheme.spacing }
    };
  }
} 