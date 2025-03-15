import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume, Education, WorkExperience, PersonalInfo, Skills, Project, Certification } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeSubject = new BehaviorSubject<Resume | null>(null);
  resume$: Observable<Resume | null> = this.resumeSubject.asObservable();

  constructor() {
    this.initializeResume();
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
    this.resumeSubject.next(initialResume);
  }

  getResume(): Observable<Resume | null> {
    return this.resume$;
  }

  updatePersonalInfo(personalInfo: PersonalInfo): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        personalInfo
      });
    }
  }

  updateSummary(summary: string): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        summary
      });
    }
  }

  updateWorkExperience(workExperience: WorkExperience[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        workExperience
      });
    }
  }

  updateEducation(education: Education[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        education
      });
    }
  }

  updateSkills(skills: Skills): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        skills
      });
    }
  }

  updateProjects(projects: Project[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        projects
      });
    }
  }

  updateCertifications(certifications: Certification[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      this.resumeSubject.next({
        ...currentResume,
        certifications
      });
    }
  }

  saveResume(): void {
    const resume = this.resumeSubject.value;
    if (resume) {
      localStorage.setItem('resume', JSON.stringify(resume));
    }
  }

  loadResume(): void {
    const savedResume = localStorage.getItem('resume');
    if (savedResume) {
      this.resumeSubject.next(JSON.parse(savedResume));
    }
  }
}
