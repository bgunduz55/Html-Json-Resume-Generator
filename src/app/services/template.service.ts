import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume, Skills } from '../shared/models/resume.model';
import { Template } from '../shared/models/template.model';

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private readonly STORAGE_KEY = 'selectedTemplate';
  private templateSubject = new BehaviorSubject<string>('creative-portfolio');
  public readonly templateChange$: Observable<string> = this.templateSubject.asObservable();

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

  constructor() {
    const savedTemplate = localStorage.getItem(this.STORAGE_KEY);
    if (savedTemplate) {
      this.templateSubject.next(savedTemplate);
    } else {
      // Set default template and save to localStorage
      this.setTemplate('creative-portfolio');
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
    // Save to localStorage and update subject
    localStorage.setItem(this.STORAGE_KEY, templateId);
    this.templateSubject.next(templateId);
  }

  getCurrentTemplate(): string {
    const templateId: string = localStorage.getItem(this.STORAGE_KEY) || 'classic-elegant';
    this.templateSubject.next(templateId);
    return templateId;
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
      if (info.fullName) score += weights.personalInfo * 0.3;
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
    if (resume.skills && this.hasSkills(resume.skills)) {
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

    if (!resume.summary) {
      tips.push('Add a professional summary to improve visibility');
    }

    if (!resume.workExperience?.length) {
      tips.push('Add work experience to improve your resume\'s strength');
    }

    if (!resume.education?.length) {
      tips.push('Add education details to complete your profile');
    }

    if (!resume.skills || !this.hasSkills(resume.skills)) {
      tips.push('Add more skills to improve keyword matching');
    } else if (this.countSkills(resume.skills) < 5) {
      tips.push('Consider adding more relevant skills');
    }

    return tips;
  }

  generateHtml(resume: Resume): string {
    const template = this.getCurrentTemplate();
    switch (template) {
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

  validateResume(resume: Resume): string[] {
    const errors: string[] = [];

    // Validate personal info
    if (!resume.personalInfo) {
      errors.push('Personal information is required');
    } else {
      if (!resume.personalInfo.fullName) errors.push('Name is required');
      if (!resume.personalInfo.email) errors.push('Email is required');
      if (!resume.personalInfo.phone) errors.push('Phone number is required');
      if (!resume.personalInfo.location) errors.push('Location is required');
    }

    // Validate skills
    const skillsErrors = this.validateSkills(resume);
    errors.push(...skillsErrors);

    // Validate work experience
    if (!resume.workExperience || resume.workExperience.length === 0) {
      errors.push('At least one work experience entry is required');
    } else {
      resume.workExperience.forEach((exp, index) => {
        if (!exp.company) errors.push(`Work experience ${index + 1}: Company name is required`);
        if (!exp.title) errors.push(`Work experience ${index + 1}: Title is required`);
        if (!exp.startDate) errors.push(`Work experience ${index + 1}: Start date is required`);
        if (!exp.description) errors.push(`Work experience ${index + 1}: Description is required`);
      });
    }

    // Validate education
    if (!resume.education || resume.education.length === 0) {
      errors.push('At least one education entry is required');
    } else {
      resume.education.forEach((edu, index) => {
        if (!edu.school) errors.push(`Education ${index + 1}: School name is required`);
        if (!edu.degree) errors.push(`Education ${index + 1}: Degree is required`);
        if (!edu.field) errors.push(`Education ${index + 1}: Field of study is required`);
        if (!edu.startDate) errors.push(`Education ${index + 1}: Start date is required`);
      });
    }

    return errors;
  }

  private validateSkills(resume: Resume): string[] {
    const errors: string[] = [];
    
    if (!resume.skills) {
      errors.push('Skills section is missing');
      return errors;
    }

    const totalSkills = this.countSkills(resume.skills);
    
    if (totalSkills === 0) {
      errors.push('Add at least 5 skills to showcase your expertise');
    } else if (totalSkills < 5) {
      errors.push(`Add ${5 - totalSkills} more skills to better represent your capabilities`);
    }

    return errors;
  }

  private countSkills(skills: Skills): number {
    return (
      (skills.programming_languages?.length || 0) +
      (skills.frameworks_platforms?.length || 0) +
      (skills.cloud_infrastructure?.length || 0) +
      (skills.databases?.length || 0) +
      (skills.methodologies_practices?.length || 0)
    );
  }

  private hasSkills(skills: Skills): boolean {
    return !!(
      skills.programming_languages?.length ||
      skills.frameworks_platforms?.length ||
      skills.cloud_infrastructure?.length ||
      skills.databases?.length ||
      skills.methodologies_practices?.length
    );
  }
} 