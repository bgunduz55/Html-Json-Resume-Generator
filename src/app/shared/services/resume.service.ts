import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume, Education, WorkExperience, PersonalInfo, Skills, Project, Certification } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private readonly STORAGE_KEY = 'currentResume';
  private resumeSubject = new BehaviorSubject<Resume | null>(null);
  currentResume$ = this.resumeSubject.asObservable();

  constructor() {
    // Load saved resume from localStorage or create default
    const savedResume = localStorage.getItem(this.STORAGE_KEY);
    if (savedResume) {
      try {
        const parsedResume = JSON.parse(savedResume);
        if (this.isValidResumeStructure(parsedResume)) {
          this.resumeSubject.next(parsedResume);
        } else {
          this.initializeEmptyResume();
        }
      } catch (error) {
        console.error('Error loading saved resume:', error);
        this.initializeEmptyResume();
      }
    } else {
      this.initializeEmptyResume();
    }
  }

  private initializeEmptyResume(): void {
    const emptyResume: Resume = {
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
    
    this.updateResume(emptyResume);
  }

  getResume(): Observable<Resume | null> {
    return this.currentResume$;
  }

  updateResume(resume: Resume): void {
    if (this.isValidResumeStructure(resume)) {
      // Save to localStorage and update subject
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(resume));
      this.resumeSubject.next(resume);
    }
  }

  private isValidResumeStructure(resume: any): resume is Resume {
    if (!resume || typeof resume !== 'object') {
      return false;
    }

    // Check required fields
    const requiredFields = ['personalInfo', 'summary', 'workExperience', 'education', 'skills', 'projects', 'certifications'];
    const missingFields = requiredFields.filter(field => !(field in resume));
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return false;
    }

    // Initialize missing arrays if they don't exist
    if (!Array.isArray(resume.workExperience)) resume.workExperience = [];
    if (!Array.isArray(resume.education)) resume.education = [];
    if (!Array.isArray(resume.projects)) resume.projects = [];
    if (!Array.isArray(resume.certifications)) resume.certifications = [];

    // Initialize skills object if it doesn't exist
    if (!resume.skills || typeof resume.skills !== 'object') {
      resume.skills = { technical: [], soft: [] };
    }

    // Initialize personal info if it doesn't exist
    if (!resume.personalInfo || typeof resume.personalInfo !== 'object') {
      resume.personalInfo = {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        photo: ''
      };
    }

    // Initialize summary if it doesn't exist
    if (typeof resume.summary !== 'string') {
      resume.summary = '';
    }

    return true;
  }

  clearResume(): void {
    this.initializeEmptyResume();
  }

  updatePersonalInfo(personalInfo: PersonalInfo): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        personalInfo
      };
      this.updateResume(updatedResume);
    }
  }

  updateSummary(summary: string): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        summary
      };
      this.updateResume(updatedResume);
    }
  }

  updateWorkExperience(workExperience: WorkExperience[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        workExperience
      };
      this.updateResume(updatedResume);
    }
  }

  updateEducation(education: Education[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        education
      };
      this.updateResume(updatedResume);
    }
  }

  updateSkills(skills: Skills): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        skills
      };
      this.updateResume(updatedResume);
    }
  }

  updateProjects(projects: Project[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        projects
      };
      this.updateResume(updatedResume);
    }
  }

  updateCertifications(certifications: Certification[]): void {
    const currentResume = this.resumeSubject.value;
    if (currentResume) {
      const updatedResume = {
        ...currentResume,
        certifications
      };
      this.updateResume(updatedResume);
    }
  }
}