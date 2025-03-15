import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    fontSize: string;
    lineHeight: string;
  };
  spacing: {
    sectionGap: string;
    elementGap: string;
    contentPadding: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes: Theme[] = [
    {
      id: 'modern',
      name: 'Modern',
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
    },
    {
      id: 'classic',
      name: 'Classic',
      colors: {
        primary: '#000000',
        secondary: '#333333',
        background: '#ffffff',
        text: '#000000',
        accent: '#666666'
      },
      typography: {
        fontFamily: 'Times New Roman, serif',
        headingFont: 'Georgia, serif',
        fontSize: '14px',
        lineHeight: '1.5'
      },
      spacing: {
        sectionGap: '1.5rem',
        elementGap: '0.75rem',
        contentPadding: '1.5rem'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      colors: {
        primary: '#222222',
        secondary: '#444444',
        background: '#fafafa',
        text: '#222222',
        accent: '#888888'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        headingFont: 'Inter, sans-serif',
        fontSize: '15px',
        lineHeight: '1.5'
      },
      spacing: {
        sectionGap: '2.5rem',
        elementGap: '1.25rem',
        contentPadding: '2.5rem'
      }
    }
  ];

  private currentThemeSubject = new BehaviorSubject<Theme>(this.themes[0]);
  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    // Load saved theme from localStorage
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
      const theme = this.themes.find(t => t.id === savedThemeId);
      if (theme) {
        this.setTheme(theme.id);
      }
    }
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  setTheme(themeId: string): void {
    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      this.currentThemeSubject.next(theme);
      localStorage.setItem('selectedTheme', themeId);
      this.applyTheme(theme);
    }
  }

  getCurrentTheme(): Theme {
    return this.currentThemeSubject.value;
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    // Apply colors
    root.style.setProperty('--primary-color', theme.colors.primary);
    root.style.setProperty('--secondary-color', theme.colors.secondary);
    root.style.setProperty('--background-color', theme.colors.background);
    root.style.setProperty('--text-color', theme.colors.text);
    root.style.setProperty('--accent-color', theme.colors.accent);

    // Apply typography
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--heading-font', theme.typography.headingFont);
    root.style.setProperty('--font-size', theme.typography.fontSize);
    root.style.setProperty('--line-height', theme.typography.lineHeight);

    // Apply spacing
    root.style.setProperty('--section-gap', theme.spacing.sectionGap);
    root.style.setProperty('--element-gap', theme.spacing.elementGap);
    root.style.setProperty('--content-padding', theme.spacing.contentPadding);
  }

  customizeTheme(themeId: string, customizations: Partial<Theme>): void {
    const baseTheme = this.themes.find(t => t.id === themeId);
    if (!baseTheme) return;

    const customTheme: Theme = {
      ...baseTheme,
      ...customizations,
      colors: { ...baseTheme.colors, ...customizations.colors },
      typography: { ...baseTheme.typography, ...customizations.typography },
      spacing: { ...baseTheme.spacing, ...customizations.spacing }
    };

    this.applyTheme(customTheme);
  }
} 