import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ResumeService } from '../../shared/services/resume.service';
import { TemplateService, TemplateType } from '../../shared/services/template.service';
import { Resume } from '../../shared/models/resume.model';
import { Subscription } from 'rxjs';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  @ViewChild('previewContent') previewContent!: ElementRef;
  resume: Resume | null = null;
  selectedTemplate: TemplateType = 'modern-professional';
  isGeneratingPdf = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private resumeService: ResumeService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    // Subscribe to resume updates
    this.subscriptions.push(
      this.resumeService.getResume().subscribe(resume => {
        this.resume = resume;
      })
    );

    // Subscribe to template selection updates
    this.subscriptions.push(
      this.templateService.selectedTemplate$.subscribe(template => {
        this.selectedTemplate = template;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onTemplateChange(templateId: TemplateType): void {
    this.templateService.selectTemplate(templateId);
  }

  async downloadPDF(): Promise<void> {
    if (!this.previewContent || !this.resume) return;

    this.isGeneratingPdf = true;
    try {
      const content = this.previewContent.nativeElement;
      const fileName = this.resume.personalInfo.fullName
        ? `${this.resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'resume.pdf';

      const opt = {
        margin: 10,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as const,
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(content).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isGeneratingPdf = false;
    }
  }
} 