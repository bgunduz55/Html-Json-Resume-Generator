import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private selectedTheme = new BehaviorSubject<Theme | null>(null);
  private themes: Theme[] = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean and professional look',
      primaryColor: '#2c3e50',
      secondaryColor: '#34495e',
      backgroundColor: '#ffffff',
      textColor: '#2c3e50',
      fontFamily: 'Arial, sans-serif',
      previewImageUrl: 'assets/themes/professional-preview.png'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary and minimalist design',
      primaryColor: '#3498db',
      secondaryColor: '#2980b9',
      backgroundColor: '#f8f9fa',
      textColor: '#2c3e50',
      fontFamily: 'Roboto, sans-serif',
      previewImageUrl: 'assets/themes/modern-preview.png'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and timeless style',
      primaryColor: '#2c3e50',
      secondaryColor: '#95a5a6',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      fontFamily: 'Times New Roman, serif',
      previewImageUrl: 'assets/themes/classic-preview.png'
    }
  ];

  constructor() {
    // Load saved theme selection from localStorage if exists
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      const theme = this.themes.find(t => t.id === savedTheme);
      if (theme) {
        this.selectedTheme.next(theme);
      }
    }
  }

  getThemes(): Theme[] {
    return this.themes;
  }

  getSelectedTheme(): Observable<Theme | null> {
    return this.selectedTheme.asObservable();
  }

  selectTheme(themeId: string): void {
    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      this.selectedTheme.next(theme);
      localStorage.setItem('selectedTheme', themeId);
      this.applyTheme(theme);
    }
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--font-family', theme.fontFamily);
  }
}
