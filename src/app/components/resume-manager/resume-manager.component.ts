import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../shared/services/resume.service';
import { PdfExportService } from '../../services/pdf-export.service';
import { Resume } from '../../shared/models/resume.model';
import { Subscription } from 'rxjs';

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
export class ResumeManagerComponent implements OnInit, OnDestroy {
  private currentResume: Resume | null = null;
  private subscription: Subscription;

  constructor(
    private resumeService: ResumeService,
    private pdfExportService: PdfExportService,
    private router: Router
  ) {
    this.subscription = this.resumeService.currentResume$.subscribe(resume => {
      this.currentResume = resume;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  exportResume(): void {
    if (this.currentResume) {
      const jsonStr = JSON.stringify(this.currentResume, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
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

  exportToPdf(): void {
    this.router.navigate(['/preview']);
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string) as Resume;
          this.resumeService.updateResume(jsonData);
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