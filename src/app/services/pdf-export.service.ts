import { Injectable } from '@angular/core';
import { ResumeService } from '../shared/services/resume.service';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  constructor(private resumeService: ResumeService) {}

  async exportToPdf(elementId: string, filename: string = 'resume.pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as 'portrait' | 'landscape' }
    };

    try {
      await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error('Failed to export PDF:', error);
      throw new Error('Failed to export PDF');
    }
  }
} 