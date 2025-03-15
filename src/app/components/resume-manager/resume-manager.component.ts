import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { PdfExportService } from '../../services/pdf-export.service';

interface SavedResume {
  id: string;
  resume: any;
  lastModified: Date;
}

@Component({
  selector: 'app-resume-manager',
  template: `
    <div class="resume-actions">
      <div class="action-group">
        <button class="action-button" (click)="exportResume()">
          <i class="fas fa-file-download"></i>
          <span>Export JSON</span>
        </button>
        <button class="action-button" (click)="exportToPdf()">
          <i class="fas fa-file-pdf"></i>
          <span>Export PDF</span>
        </button>
        <div class="file-upload">
          <input
            type="file"
            #fileInput
            (change)="handleFileInput($event)"
            accept=".json"
            style="display: none"
          />
          <button class="action-button" (click)="fileInput.click()">
            <i class="fas fa-file-upload"></i>
            <span>Import JSON</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .resume-actions {
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .action-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .action-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background-color: #007bff;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #0056b3;
      }

      i {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 768px) {
      .action-button span {
        display: none;
      }

      .action-button {
        padding: 0.5rem;
      }
    }
  `]
})
export class ResumeManagerComponent implements OnInit {
  resumes: SavedResume[] = [];

  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private pdfExportService: PdfExportService
  ) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  createNewResume(): void {
    const id = this.resumeService.createNewResume();
    this.router.navigate(['/editor', id]);
  }

  editResume(id: string): void {
    this.router.navigate(['/editor', id]);
  }

  deleteResume(id: string): void {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(id);
      this.loadResumes();
    }
  }

  private loadResumes(): void {
    this.resumes = this.resumeService.getSavedResumes().map(resume => ({
      ...resume,
      lastModified: new Date(resume.lastModified)
    }));
  }

  exportResume(): void {
    try {
      const jsonData = this.resumeService.exportToJson();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.json';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export resume:', error);
      // TODO: Add proper error handling/notification
    }
  }

  async exportToPdf(): Promise<void> {
    try {
      await this.pdfExportService.exportToPdf('resume-content', 'resume.pdf');
      // TODO: Add success notification
    } catch (error) {
      console.error('Failed to export PDF:', error);
      // TODO: Add error notification
    }
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = reader.result as string;
          this.resumeService.importFromJson(jsonData);
          // TODO: Add success notification
        } catch (error) {
          console.error('Failed to import resume:', error);
          // TODO: Add error notification
        }
      };
      reader.readAsText(file);
    }
  }
} 