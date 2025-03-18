import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type TemplateType = 'modern-professional' | 'classic-elegant' | 'creative-portfolio';

export interface Template {
  id: TemplateType;
  name: string;
  description: string;
  previewImageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private readonly STORAGE_KEY = 'selectedTemplate';
  private readonly templates: Template[] = [
    {
      id: 'modern-professional',
      name: 'Modern Professional',
      description: 'A clean and modern design suitable for most professional fields.',
      previewImageUrl: 'assets/images/templates/modern-professional.png'
    },
    {
      id: 'classic-elegant',
      name: 'Classic Elegant',
      description: 'A timeless design with elegant typography and layout.',
      previewImageUrl: 'assets/images/templates/classic-elegant.png'
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      description: 'A creative design perfect for showcasing your portfolio.',
      previewImageUrl: 'assets/images/templates/creative-portfolio.png'
    }
  ];

  private selectedTemplateSubject = new BehaviorSubject<TemplateType>('modern-professional');
  selectedTemplate$ = this.selectedTemplateSubject.asObservable();

  constructor() {
    this.loadSavedTemplate();
  }

  private loadSavedTemplate(): void {
    const savedTemplate = localStorage.getItem(this.STORAGE_KEY);
    if (savedTemplate && this.isValidTemplate(savedTemplate)) {
      this.selectedTemplateSubject.next(savedTemplate as TemplateType);
    }
  }

  private isValidTemplate(template: string): boolean {
    return this.templates.some(t => t.id === template);
  }

  getTemplates(): Template[] {
    return this.templates;
  }

  getCurrentTemplate(): TemplateType {
    return this.selectedTemplateSubject.value;
  }

  selectTemplate(templateId: TemplateType): void {
    if (this.isValidTemplate(templateId)) {
      this.selectedTemplateSubject.next(templateId);
      localStorage.setItem(this.STORAGE_KEY, templateId);
    }
  }
}
