import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Resume, WorkExperience } from '../../models/resume.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  resume: Resume;
  private subscription: Subscription;
  showImportExport = false;
  workExperience: WorkExperience[] = [];

  constructor(
    private resumeService: ResumeService,
    private router: Router
  ) {
    this.resume = this.resumeService.getResume();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.resumeService.resume$.subscribe(resume => {
        this.resume = resume;
        this.workExperience = resume.workExperience;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleImportExport(): void {
    this.showImportExport = !this.showImportExport;
  }

  exportResume(): void {
    const dataStr = JSON.stringify(this.resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'resume.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importResume(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedResume = JSON.parse(e.target?.result as string);
          this.resumeService.setResume(importedResume);
        } catch (error) {
          console.error('Error parsing resume JSON:', error);
          // TODO: Add error notification
        }
      };
      reader.readAsText(file);
    }
  }

  previewResume(): void {
    // TODO: Implement preview functionality
    console.log('Preview functionality will be implemented');
  }

  downloadPDF(): void {
    // TODO: Implement PDF download functionality
    console.log('PDF download functionality will be implemented');
  }
} 