import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Template } from '../../../shared/models/template.model';
import { Theme } from '../../../shared/models/theme.model';
import { TemplateService } from '../../../shared/services/template.service';
import { ThemeService } from '../../../shared/services/theme.service';
import { ResumeService } from '../../../shared/services/resume.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  templates: Template[] = [];
  themes: Theme[] = [];
  selectedTemplateId: string = '';
  selectedThemeId: string = '';
  showAtsOnly: boolean = false;

  constructor(
    private templateService: TemplateService,
    private themeService: ThemeService,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.templates = this.templateService.getTemplates();
    this.themes = this.themeService.getThemes();
  }

  onTemplateSelect(templateId: string): void {
    this.selectedTemplateId = templateId;
    this.templateService.selectTemplate(templateId);
  }

  onThemeSelect(themeId: string): void {
    this.selectedThemeId = themeId;
    this.themeService.selectTheme(themeId);
  }

  onAtsToggle(): void {
    this.showAtsOnly = !this.showAtsOnly;
    this.templates = this.showAtsOnly 
      ? this.templateService.getAtsOptimizedTemplates()
      : this.templateService.getTemplates();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = e.target?.result as string;
          this.resumeService.importResumeJson(jsonContent);
          // Navigate to editor after successful import
          this.router.navigate(['/editor']);
        } catch (error) {
          console.error('Error importing resume:', error);
          // Handle error (show message to user)
        }
      };
      reader.readAsText(file);
    }
  }

  onCreateNew(): void {
    if (this.selectedTemplateId && this.selectedThemeId) {
      this.router.navigate(['/editor']);
    }
  }
}
