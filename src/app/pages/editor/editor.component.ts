import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resume } from '../../shared/models/resume.model';
import { ResumeService } from '../../shared/services/resume.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  resume: Resume | null = null;
  activeSection: string = 'personal-info';

  constructor(private router: Router, private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResume().subscribe((resume: Resume | null) => {
      this.resume = resume;
    });
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }
} 