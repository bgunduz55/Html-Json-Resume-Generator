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
      id: 'modern-professional',
      name: 'Modern Professional',
      description: 'A clean and professional template with a modern design',
      thumbnail: 'assets/images/templates/modern-professional.png',
      isAtsOptimized: true
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A creative template for designers and artists',
      thumbnail: 'assets/images/templates/creative.png',
      isAtsOptimized: false
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A minimalist template focusing on essential information',
      thumbnail: 'assets/images/templates/minimal.png',
      isAtsOptimized: true
    }
  ];

  private currentTemplate: string = 'modern-professional';

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

  getCurrentTemplate(): string {
    return this.currentTemplate;
  }

  setTemplate(templateId: string): void {
    if (this.templates.some(t => t.id === templateId)) {
      this.currentTemplate = templateId;
    }
  }
}
