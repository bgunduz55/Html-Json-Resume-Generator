import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeData = new BehaviorSubject<Resume | null>(null);

  constructor() {
    // Load saved resume data from localStorage if exists
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) {
      this.resumeData.next(JSON.parse(savedResume));
    }
  }

  getResumeData(): Observable<Resume | null> {
    return this.resumeData.asObservable();
  }

  updateResumeData(data: Resume): void {
    this.resumeData.next(data);
    localStorage.setItem('resumeData', JSON.stringify(data));
  }

  exportResumeJson(): string {
    return JSON.stringify(this.resumeData.value, null, 2);
  }

  importResumeJson(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData) as Resume;
      this.updateResumeData(data);
    } catch (error) {
      console.error('Invalid JSON format:', error);
      throw new Error('Invalid JSON format');
    }
  }

  clearResumeData(): void {
    this.resumeData.next(null);
    localStorage.removeItem('resumeData');
  }
}
