import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private selectedTemplate = new BehaviorSubject<Template | null>(null);
  private templates: Template[] = [
    {
      id: 'classic',
      name: 'Classic Resume',
      description: 'Traditional resume format suitable for most industries',
      isAtsOptimized: true,
      previewImageUrl: 'assets/templates/classic-preview.png'
    },
    {
      id: 'modern',
      name: 'Modern Resume',
      description: 'Contemporary design with a clean and professional look',
      isAtsOptimized: true,
      previewImageUrl: 'assets/templates/modern-preview.png'
    },
    {
      id: 'creative',
      name: 'Creative Resume',
      description: 'Unique design for creative professionals',
      isAtsOptimized: false,
      previewImageUrl: 'assets/templates/creative-preview.png'
    }
  ];

  constructor() {
    // Load saved template selection from localStorage if exists
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      const template = this.templates.find(t => t.id === savedTemplate);
      if (template) {
        this.selectedTemplate.next(template);
      }
    }
  }

  getTemplates(): Template[] {
    return this.templates;
  }

  getSelectedTemplate(): Observable<Template | null> {
    return this.selectedTemplate.asObservable();
  }

  selectTemplate(templateId: string): void {
    const template = this.templates.find(t => t.id === templateId);
    if (template) {
      this.selectedTemplate.next(template);
      localStorage.setItem('selectedTemplate', templateId);
    }
  }

  getAtsOptimizedTemplates(): Template[] {
    return this.templates.filter(t => t.isAtsOptimized);
  }
}
