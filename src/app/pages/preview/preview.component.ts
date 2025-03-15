import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ResumeService } from '../../shared/services/resume.service';
import { TemplateService } from '../../services/template.service';
import { Resume } from '../../shared/models/resume.model';
import { Subscription } from 'rxjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  @ViewChild('previewContent') previewContent!: ElementRef;
  resume: Resume | null = null;
  selectedTemplate: string = 'modern-professional';
  isGeneratingPdf = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private resumeService: ResumeService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    // Subscribe to resume changes
    this.subscriptions.push(
      this.resumeService.currentResume$.subscribe(resume => {
        this.resume = resume;
        console.log('Resume updated in preview:', resume);
      })
    );

    // Subscribe to template changes
    this.subscriptions.push(
      this.templateService.templateChange$.subscribe(templateId => {
        this.selectedTemplate = templateId;
        console.log('Template updated in preview:', templateId);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async downloadPDF(): Promise<void> {
    if (!this.previewContent || !this.resume) return;

    this.isGeneratingPdf = true;
    try {
      const content = this.previewContent.nativeElement;
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const contentWidth = content.offsetWidth;
      const contentHeight = content.offsetHeight;
      const aspectRatio = contentHeight / contentWidth;

      // A4 dimensions in pts (72 pts = 1 inch)
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const pdf = new jsPDF('p', 'pt', 'a4');

      const imgWidth = pageWidth;
      const imgHeight = pageWidth * aspectRatio;
      const numPages = Math.ceil(imgHeight / pageHeight);

      for (let i = 0; i < numPages; i++) {
        if (i > 0) pdf.addPage();

        const sourceY = i * (pageHeight / (imgHeight / canvas.height));
        const destY = 0;

        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          destY - (i * pageHeight),
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
      }

      pdf.save(`${this.resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isGeneratingPdf = false;
    }
  }
} 