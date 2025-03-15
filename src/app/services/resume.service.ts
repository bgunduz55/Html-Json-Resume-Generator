import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume, Education, WorkExperience, PersonalInfo, Skills, Project, Certification } from '../shared/models/resume.model';

interface SavedResume {
  id: string;
  name: string;
  resume: Resume;
  lastModified: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private currentResume = new BehaviorSubject<Resume | null>(null);
  currentResume$ = this.currentResume.asObservable();

  constructor() {
    this.loadSavedResume();
  }

  private loadSavedResume(): void {
    const savedResume = localStorage.getItem('resume');
    if (savedResume) {
      this.currentResume.next(JSON.parse(savedResume));
    } else {
      this.initializeResume();
    }
  }

  private initializeResume(): void {
    const initialResume: Resume = {
      personalInfo: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        photo: ''
      },
      summary: '',
      workExperience: [],
      education: [],
      skills: {
        technical: [],
        soft: []
      },
      projects: [],
      certifications: []
    };
    this.currentResume.next(initialResume);
    this.saveResume();
  }

  getCurrentResume(): Observable<Resume | null> {
    return this.currentResume$;
  }

  getResume(): Observable<Resume | null> {
    return this.currentResume$;
  }

  updateCurrentResume(resume: Resume): void {
    this.currentResume.next(resume);
    this.saveResume();
  }

  updatePersonalInfo(personalInfo: PersonalInfo): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        personalInfo
      });
    }
  }

  updateSummary(summary: string): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        summary
      });
    }
  }

  updateWorkExperience(workExperience: WorkExperience[]): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        workExperience
      });
    }
  }

  updateEducation(education: Education[]): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        education
      });
    }
  }

  updateSkills(skills: Skills): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        skills
      });
    }
  }

  updateProjects(projects: Project[]): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        projects
      });
    }
  }

  updateCertifications(certifications: Certification[]): void {
    const currentResume = this.currentResume.value;
    if (currentResume) {
      this.updateCurrentResume({
        ...currentResume,
        certifications
      });
    }
  }

  private saveResume(): void {
    const resume = this.currentResume.value;
    if (resume) {
      localStorage.setItem('resume', JSON.stringify(resume));
    }
  }
} 