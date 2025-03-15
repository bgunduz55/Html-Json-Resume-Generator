import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ResumeService } from '../../shared/services/resume.service';
import { TemplateService, TemplateType } from '../../shared/services/template.service';
import { Resume } from '../../shared/models/resume.model';
import { Subscription } from 'rxjs';

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
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Could not open print window');
      }

      // Get the resume content
      const content = this.previewContent.nativeElement;

      // Write the content to the new window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${this.resume.personalInfo.fullName || 'Resume'}</title>
          <style>
            @page {
              size: A4;
              margin: 0.5cm;
            }
            
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .resume {
              width: 210mm;
              min-height: 297mm;
              padding: 0;
              margin: 0 auto;
              background: white;
            }

            a {
              text-decoration: underline;
            }

            /* Copy existing styles from the main document */
            ${Array.from(document.styleSheets)
              .filter(sheet => {
                try {
                  return sheet.cssRules && !sheet.href; // Only include internal styles
                } catch {
                  return false;
                }
              })
              .map(sheet => {
                try {
                  return Array.from(sheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('\n');
                } catch {
                  return '';
                }
              })
              .join('\n')}
          </style>
        </head>
        <body>
          <div class="resume">
            ${content.innerHTML}
          </div>
        </body>
        </html>
      `);

      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Print and close the window
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isGeneratingPdf = false;
    }
  }
} 