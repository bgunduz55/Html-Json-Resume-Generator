import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../../shared/services/resume.service';
import { WorkExperience } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.scss']
})
export class WorkExperienceFormComponent implements OnInit {
  workExperienceForm: FormGroup;
  editIndex: number = -1;
  showForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.workExperienceForm = this.fb.group({
      experiences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadWorkExperience();
  }

  private loadWorkExperience(): void {
    this.resumeService.getResume().subscribe(resume => {
      if (resume?.workExperience) {
        const experiencesArray = this.workExperienceForm.get('experiences') as FormArray;
        experiencesArray.clear();
        resume.workExperience.forEach(exp => {
          experiencesArray.push(this.createExperienceForm(exp));
        });
      }
    });
  }

  get experiences(): FormArray {
    return this.workExperienceForm.get('experiences') as FormArray;
  }

  createExperienceForm(experience: Partial<WorkExperience> = {}): FormGroup {
    return this.fb.group({
      title: [experience.title || '', Validators.required],
      company: [experience.company || '', Validators.required],
      startDate: [experience.startDate || '', Validators.required],
      endDate: [experience.endDate || ''],
      current: [experience.current || false],
      description: [experience.description || '', Validators.required],
      achievements: this.fb.array(experience.achievements || []),
      technologies: this.fb.array(experience.technologies || [])
    });
  }

  addExperience(): void {
    this.editIndex = -1;
    this.showForm = true;
    this.experiences.push(this.createExperienceForm());
  }

  editExperience(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteExperience(index: number): void {
    this.experiences.removeAt(index);
    this.saveChanges();
  }

  getExperienceForm(index: number): FormGroup {
    return this.experiences.at(index) as FormGroup;
  }

  getAchievements(experienceIndex: number): FormArray {
    return this.getExperienceForm(experienceIndex).get('achievements') as FormArray;
  }

  addAchievement(experienceIndex: number): void {
    this.getAchievements(experienceIndex).push(this.fb.control(''));
  }

  removeAchievement(experienceIndex: number, achievementIndex: number): void {
    this.getAchievements(experienceIndex).removeAt(achievementIndex);
    this.saveChanges();
  }

  getTechnologies(experienceIndex: number): FormArray {
    return this.getExperienceForm(experienceIndex).get('technologies') as FormArray;
  }

  addTechnology(experienceIndex: number): void {
    this.getTechnologies(experienceIndex).push(this.fb.control(''));
  }

  removeTechnology(experienceIndex: number, technologyIndex: number): void {
    this.getTechnologies(experienceIndex).removeAt(technologyIndex);
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.workExperienceForm.valid) {
      this.resumeService.updateWorkExperience(this.workExperienceForm.value.experiences);
      if (this.editIndex === -1) {
        this.showForm = false;
      }
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editIndex = -1;
    this.loadWorkExperience();
  }
}
