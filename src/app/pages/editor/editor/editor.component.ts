import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Resume } from '../../../shared/models/resume.model';
import { ResumeService } from '../../../shared/services/resume.service';
import { TemplateService } from '../../../shared/services/template.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  activeSection: string = 'personal';
  resumeData: Resume | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private resumeService: ResumeService,
    private templateService: TemplateService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to resume data changes
    this.subscriptions.push(
      this.resumeService.getResumeData().subscribe(data => {
        this.resumeData = data;
      })
    );

    // If no template or theme is selected, redirect to home
    this.subscriptions.push(
      this.templateService.getSelectedTemplate().subscribe(template => {
        if (!template) {
          this.router.navigate(['/']);
        }
      })
    );

    this.subscriptions.push(
      this.themeService.getSelectedTheme().subscribe(theme => {
        if (!theme) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Cleanup subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSectionChange(section: string): void {
    this.activeSection = section;
  }

  onPreview(): void {
    this.router.navigate(['/preview']);
  }

  onExportJson(): void {
    if (this.resumeData) {
      const jsonString = this.resumeService.exportResumeJson();
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }

  onSave(): void {
    // Auto-save is handled by individual form components
    // This is just for manual save confirmation
    console.log('Resume saved successfully');
  }
}
