import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private initialResume: Resume = {
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: '',
      github: '',
      summary: ''
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  };

  private resumeSubject = new BehaviorSubject<Resume>(this.initialResume);
  resume$ = this.resumeSubject.asObservable();

  constructor() {
    // Load saved resume from localStorage if exists
    const savedResume = localStorage.getItem('resume');
    if (savedResume) {
      try {
        this.resumeSubject.next(JSON.parse(savedResume));
      } catch (error) {
        console.error('Error parsing saved resume:', error);
      }
    }
  }

  getResume(): Resume {
    return this.resumeSubject.value;
  }

  setResume(resume: Resume): void {
    this.resumeSubject.next(resume);
    this.saveToLocalStorage();
  }

  updatePersonalInfo(personalInfo: Resume['personalInfo']): void {
    const currentResume = this.getResume();
    this.setResume({ ...currentResume, personalInfo });
  }

  updateWorkExperience(workExperience: Resume['workExperience']): void {
    const currentResume = this.getResume();
    this.setResume({ ...currentResume, workExperience });
  }

  updateEducation(education: Resume['education']): void {
    const currentResume = this.getResume();
    this.setResume({ ...currentResume, education });
  }

  updateSkills(skills: Resume['skills']): void {
    const currentResume = this.getResume();
    this.setResume({ ...currentResume, skills });
  }

  updateProjects(projects: Resume['projects']): void {
    const currentResume = this.getResume();
    this.setResume({ ...currentResume, projects });
  }

  updateCertifications(certifications: Resume['certifications']): void {
    const currentResume = this.getResume();
    this.setResume({ ...currentResume, certifications });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('resume', JSON.stringify(this.getResume()));
  }
} 