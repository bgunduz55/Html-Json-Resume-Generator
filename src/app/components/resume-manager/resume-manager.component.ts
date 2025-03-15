import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';

interface SavedResume {
  id: string;
  resume: any;
  lastModified: Date;
}

@Component({
  selector: 'app-resume-manager',
  templateUrl: './resume-manager.component.html',
  styleUrls: ['./resume-manager.component.scss']
})
export class ResumeManagerComponent implements OnInit {
  resumes: SavedResume[] = [];

  constructor(
    private resumeService: ResumeService,
    private router: Router
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
} 