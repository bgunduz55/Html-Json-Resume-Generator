import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ResumeService } from '../../shared/services/resume.service';
import { TemplateService } from '../../services/template.service';
import { Resume } from '../../shared/models/resume.model';
import { Subscription } from 'rxjs';
import { ModernProfessionalComponent } from './templates/modern-professional/modern-professional.component';
import { ClassicElegantComponent } from './templates/classic-elegant/classic-elegant.component';
import { CreativePortfolioComponent } from './templates/creative-portfolio/creative-portfolio.component';
import { ProfessionalSidebarComponent } from './templates/professional-sidebar/professional-sidebar.component';
import { AtsOptimizedComponent } from './templates/ats-optimized/ats-optimized.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  @ViewChild('previewContent') previewContent!: ElementRef;
  resume: Resume | null = null;
  selectedTemplateId: string;
  isGeneratingPdf = false;
  private subscriptions: Subscription[] = [];

  templates = [
    { id: 'modern-professional', name: 'Modern Professional' },
    { id: 'creative-portfolio', name: 'Creative Portfolio' },
    { id: 'classic-elegant', name: 'Classic Elegant' },
    { id: 'ats-optimized', name: 'ATS Optimized' },
    { id: 'professional-sidebar', name: 'Professional Sidebar' },
    { id: 'minimal-clean', name: 'Minimal Clean' },
    { id: 'tech-modern', name: 'Tech Modern' }
  ];

  constructor(
    private resumeService: ResumeService,
    private templateService: TemplateService
  ) {
    // Get the last selected template from service
    this.selectedTemplateId = this.templateService.getCurrentTemplate();
  }

  ngOnInit(): void {
    // Subscribe to resume updates
    this.subscriptions.push(
      this.resumeService.currentResume$.subscribe(resume => {
        if (resume) {
          this.resume = resume;
        }
      })
    );

    // Subscribe to template changes
    this.templateService.templateChange$.subscribe(templateId => {
      this.selectedTemplateId = templateId;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onTemplateChange(event: Event): void {
    // const select = event.target as HTMLSelectElement;
    this.templateService.setTemplate(this.selectedTemplateId);
    console.log(this.selectedTemplateId);
  }

  downloadPDF() {
    const printWindow = window.open('', '', 'width=800,height=800');
    if (printWindow) {
      const content = document.querySelector('.preview-container')?.innerHTML;
      if (content) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Resume</title>
              <style>
                @page {
                  size: A4;
                  margin: 0.5cm;
                }
                body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  font-size: 9px;
                  line-height: 1.15;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .preview-container {
                  width: 100%;
                  max-width: 100%;
                  margin: 0;
                  padding: 0;
                }
                .resume {
                  padding: 0.5rem;
                  width: 100%;
                  max-width: 100%;
                  margin: 0;
                  box-sizing: border-box;
                }
                section {
                  page-break-inside: avoid;
                  margin-bottom: 0.4rem;
                  padding-bottom: 0.3rem;
                }
                .experience-item, .education-item, .project-item, .certification-item {
                  page-break-inside: avoid;
                  margin-bottom: 0.4rem;
                  padding: 0.3rem;
                }
                .personal-info {
                  margin-bottom: 0.4rem;
                  padding-bottom: 0.4rem;
                }
                h1 { font-size: 1.2rem; margin-bottom: 0.15rem; }
                h2 { font-size: 0.95rem; margin-bottom: 0.3rem; }
                h3 { font-size: 0.85rem; margin-bottom: 0.15rem; }
                h4 { font-size: 0.8rem; margin-bottom: 0.15rem; }
                p, li { font-size: 0.75rem; margin: 0.12rem 0; line-height: 1.15; }
                .contact-info p { font-size: 0.7rem; }
                .tech-tag, .skill-tag { font-size: 0.7rem; padding: 0.1rem 0.3rem; margin: 0.1rem; }
                * { box-sizing: border-box; }
              </style>
              ${document.head.innerHTML}
            </head>
            <body>
              <div class="preview-container">${content}</div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      }
    }
  }

  generatePdf() {
    const element = document.querySelector('.preview-container');
    if (element) {
      const options = {
        margin: [5, 5, 5, 5], // top, right, bottom, left margins in mm
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          windowWidth: 1200, // Force consistent width
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true,
          precision: 2
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break',
          avoid: [
            'h3', 'h4', 
            '.experience-item', 
            '.education-item', 
            '.project-item', 
            '.certification-item',
            '.timeline-item'
          ]
        }
      };

      // html2pdf().set(options).from(element).save();
    }
  }

  getTemplateComponent(templateId: string): any {
    switch (templateId) {
      case 'creative-portfolio':
        return CreativePortfolioComponent;
      case 'classic-elegant':
        return ClassicElegantComponent;
      case 'ats-optimized':
        return AtsOptimizedComponent;
      case 'professional-sidebar':
        return ProfessionalSidebarComponent;
      default:
        return ClassicElegantComponent;
    }
  }
} 