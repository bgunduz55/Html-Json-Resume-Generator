import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateService, Template } from '../../services/template.service';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume.model';
import { Subscription } from 'rxjs';

type TemplateCategory = 'modern' | 'classic' | 'creative' | 'minimal';

@Component({
  selector: 'app-template-selector',
  templateUrl: './template-selector.component.html',
  styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit, OnDestroy {
  templates: Template[] = [];
  currentTemplate!: Template;
  selectedCategory: TemplateCategory = 'modern';
  categories: TemplateCategory[] = ['modern', 'classic', 'creative', 'minimal'];
  showAtsOnly = false;
  atsScore = 0;
  atsTips: string[] = [
    'Add a professional summary to improve visibility',
    'Add work experience to improve your resume\'s strength',
    'Add education details to complete your profile',
    'Add more skills to improve keyword matching',
    'Categorize your skills for better organization'
  ];

  private subscription: Subscription;

  constructor(
    private templateService: TemplateService,
    private resumeService: ResumeService
  ) {
    this.currentTemplate = templateService.getCurrentTemplate();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadTemplates();
    this.subscription.add(
      this.templateService.templateChange$.subscribe((template: Template) => {
        this.currentTemplate = template;
        this.updateAtsScore();
      })
    );

    // Subscribe to resume changes to update ATS score
    this.subscription.add(
      this.resumeService.currentResume$.subscribe(resume => {
        if (resume) {
          this.updateAtsAnalysis(resume);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCategoryChange(category: TemplateCategory): void {
    this.selectedCategory = category;
    this.loadTemplates();
  }

  toggleAtsFilter(): void {
    this.showAtsOnly = !this.showAtsOnly;
    this.loadTemplates();
  }

  onTemplateChange(templateId: string): void {
    this.templateService.setTemplate(templateId);
  }

  private loadTemplates(): void {
    let templates = this.templateService.getTemplatesByCategory(this.selectedCategory);
    if (this.showAtsOnly) {
      templates = templates.filter(t => t.isAtsOptimized);
    }
    this.templates = templates;
  }

  private updateAtsScore(): void {
    // Calculate ATS score based on resume completeness
    // This is a placeholder implementation
    this.atsScore = this.currentTemplate?.isAtsOptimized ? 85 : 50;
  }

  private updateAtsAnalysis(resume: Resume): void {
    this.atsScore = this.templateService.analyzeAtsScore(resume);
    this.atsTips = this.templateService.getAtsOptimizationTips(resume);
  }
} 