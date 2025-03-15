import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume } from '../models/resume.model';

export interface Template {
  id: string;
  name: string;
  description: string;
  isAtsOptimized: boolean;
  previewImageUrl: string;
  keywords?: string[];
  category: 'modern' | 'classic' | 'creative' | 'minimal';
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: Template[] = [
    {
      id: 'modern-professional',
      name: 'Modern Professional',
      description: 'Clean and professional design with excellent ATS compatibility',
      isAtsOptimized: true,
      previewImageUrl: 'assets/templates/modern-professional.png',
      keywords: ['professional', 'corporate', 'business', 'clean'],
      category: 'modern'
    },
    {
      id: 'classic-elegant',
      name: 'Classic Elegant',
      description: 'Traditional resume format perfect for conservative industries',
      isAtsOptimized: true,
      previewImageUrl: 'assets/templates/classic-elegant.png',
      keywords: ['traditional', 'conservative', 'formal', 'elegant'],
      category: 'classic'
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      description: 'Eye-catching design for creative professionals',
      isAtsOptimized: false,
      previewImageUrl: 'assets/templates/creative-portfolio.png',
      keywords: ['creative', 'design', 'portfolio', 'artistic'],
      category: 'creative'
    },
    {
      id: 'minimal-clean',
      name: 'Minimal Clean',
      description: 'Simple and clean design with perfect ATS readability',
      isAtsOptimized: true,
      previewImageUrl: 'assets/templates/minimal-clean.png',
      keywords: ['minimal', 'clean', 'simple', 'modern'],
      category: 'minimal'
    },
    {
      id: 'tech-modern',
      name: 'Tech Modern',
      description: 'Modern design optimized for tech industry professionals',
      isAtsOptimized: true,
      previewImageUrl: 'assets/templates/tech-modern.png',
      keywords: ['technology', 'modern', 'professional', 'tech'],
      category: 'modern'
    }
  ];

  private currentTemplateSubject = new BehaviorSubject<Template>(this.templates[0]);
  templateChange$ = this.currentTemplateSubject.asObservable();

  constructor() {
    const savedTemplateId = localStorage.getItem('selectedTemplate');
    if (savedTemplateId) {
      const template = this.templates.find(t => t.id === savedTemplateId);
      if (template) {
        this.currentTemplateSubject.next(template);
      }
    }
  }

  getTemplates(): Template[] {
    return this.templates;
  }

  getTemplatesByCategory(category: Template['category']): Template[] {
    return this.templates.filter(t => t.category === category);
  }

  getAtsOptimizedTemplates(): Template[] {
    return this.templates.filter(t => t.isAtsOptimized);
  }

  setTemplate(templateId: string): void {
    const template = this.templates.find(t => t.id === templateId);
    if (template) {
      this.currentTemplateSubject.next(template);
      localStorage.setItem('selectedTemplate', templateId);
    }
  }

  getCurrentTemplate(): Template {
    return this.currentTemplateSubject.value;
  }

  // ATS Optimization Methods
  analyzeAtsScore(resume: Resume): number {
    let score = 0;
    const weights = {
      personalInfo: 20,
      workExperience: 30,
      education: 20,
      skills: 20,
      projects: 10
    };

    // Personal Info check
    if (resume.personalInfo) {
      const info = resume.personalInfo;
      if (info.name) score += weights.personalInfo * 0.3;
      if (info.email) score += weights.personalInfo * 0.3;
      if (info.phone) score += weights.personalInfo * 0.2;
      if (info.location) score += weights.personalInfo * 0.2;
    }

    // Work Experience check
    if (resume.workExperience && resume.workExperience.length > 0) {
      score += weights.workExperience;
    }

    // Education check
    if (resume.education && resume.education.length > 0) {
      score += weights.education;
    }

    // Skills check
    if (resume.skills && resume.skills.length > 0) {
      score += weights.skills;
    }

    // Projects check
    if (resume.projects && resume.projects.length > 0) {
      score += weights.projects;
    }

    return Math.min(100, score);
  }

  getAtsOptimizationTips(resume: Resume): string[] {
    const tips: string[] = [];

    if (!resume.personalInfo?.summary) {
      tips.push('Add a professional summary to improve visibility');
    }

    if (!resume.workExperience?.length) {
      tips.push('Add work experience to improve your resume\'s strength');
    }

    if (!resume.education?.length) {
      tips.push('Add education details to complete your profile');
    }

    if (!resume.skills?.length) {
      tips.push('Add more skills to improve keyword matching');
    } else if (resume.skills.length < 5) {
      tips.push('Consider adding more relevant skills');
    }

    return tips;
  }

  generateHtml(resume: Resume): string {
    const template = this.getCurrentTemplate();
    switch (template.id) {
      case 'modern-professional':
        return this.generateModernProfessionalTemplate(resume);
      case 'classic-elegant':
        return this.generateClassicElegantTemplate(resume);
      case 'creative-portfolio':
        return this.generateCreativePortfolioTemplate(resume);
      case 'minimal-clean':
        return this.generateMinimalCleanTemplate(resume);
      case 'tech-modern':
        return this.generateTechModernTemplate(resume);
      default:
        return this.generateModernProfessionalTemplate(resume);
    }
  }

  private generateModernProfessionalTemplate(resume: Resume): string {
    // Template implementation
    return '';
  }

  private generateClassicElegantTemplate(resume: Resume): string {
    // Template implementation
    return '';
  }

  private generateCreativePortfolioTemplate(resume: Resume): string {
    // Template implementation
    return '';
  }

  private generateMinimalCleanTemplate(resume: Resume): string {
    // Template implementation
    return '';
  }

  private generateTechModernTemplate(resume: Resume): string {
    // Template implementation
    return '';
  }
} 