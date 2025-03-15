import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../../shared/services/resume.service';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit {
  educationForm: FormGroup;
  editIndex: number = -1;
  showForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.educationForm = this.fb.group({
      educations: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadEducation();
  }

  private loadEducation(): void {
    this.resumeService.getResume().subscribe(resume => {
      if (resume?.education) {
        const educationsArray = this.educationForm.get('educations') as FormArray;
        educationsArray.clear();
        resume.education.forEach(edu => {
          educationsArray.push(this.createEducationForm(edu));
        });
      }
    });
  }

  get educations(): FormArray {
    return this.educationForm.get('educations') as FormArray;
  }

  createEducationForm(education: any = {}): FormGroup {
    return this.fb.group({
      school: [education.school || '', Validators.required],
      degree: [education.degree || '', Validators.required],
      fieldOfStudy: [education.fieldOfStudy || '', Validators.required],
      location: [education.location || ''],
      startDate: [education.startDate || '', Validators.required],
      endDate: [education.endDate || ''],
      current: [education.current || false],
      gpa: [education.gpa || ''],
      description: [education.description || ''],
      achievements: this.fb.array(education.achievements || []),
      relevantCourses: this.fb.array(education.relevantCourses || [])
    });
  }

  addEducation(): void {
    this.editIndex = -1;
    this.showForm = true;
    this.educations.push(this.createEducationForm());
  }

  editEducation(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteEducation(index: number): void {
    this.educations.removeAt(index);
    this.saveChanges();
  }

  getEducationForm(index: number): FormGroup {
    return this.educations.at(index) as FormGroup;
  }

  getAchievements(educationIndex: number): FormArray {
    return this.getEducationForm(educationIndex).get('achievements') as FormArray;
  }

  addAchievement(educationIndex: number): void {
    this.getAchievements(educationIndex).push(this.fb.control(''));
  }

  removeAchievement(educationIndex: number, achievementIndex: number): void {
    this.getAchievements(educationIndex).removeAt(achievementIndex);
    this.saveChanges();
  }

  getRelevantCourses(educationIndex: number): FormArray {
    return this.getEducationForm(educationIndex).get('relevantCourses') as FormArray;
  }

  addRelevantCourse(educationIndex: number): void {
    this.getRelevantCourses(educationIndex).push(this.fb.control(''));
  }

  removeRelevantCourse(educationIndex: number, courseIndex: number): void {
    this.getRelevantCourses(educationIndex).removeAt(courseIndex);
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.educationForm.valid) {
      this.resumeService.updateEducation(this.educationForm.value.educations);
      if (this.editIndex === -1) {
        this.showForm = false;
      }
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editIndex = -1;
    this.loadEducation();
  }
}
