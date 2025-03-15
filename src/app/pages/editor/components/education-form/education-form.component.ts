import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResumeService } from '../../../../services/resume.service';
import { Education } from '../../../../models/resume.model';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent implements OnInit, OnDestroy {
  @Input() data: Education[] = [];
  
  form: FormGroup;
  showForm = false;
  editIndex = -1;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      educations: this.fb.array([])
    });
    this.subscription = new Subscription();
  }

  get educations() {
    return this.form.get('educations') as FormArray;
  }

  getEducationForm(index: number): FormGroup {
    return this.educations.at(index) as FormGroup;
  }

  ngOnInit(): void {
    if (this.data?.length) {
      this.data.forEach(edu => {
        this.educations.push(this.createEducationForm(edu));
      });
    }

    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        this.resumeService.updateEducation(value.educations);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createEducationForm(data?: Education): FormGroup {
    return this.fb.group({
      institution: [data?.institution || '', Validators.required],
      degree: [data?.degree || '', Validators.required],
      field: [data?.field || '', Validators.required],
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || '', Validators.required],
      gpa: [data?.gpa || null],
      location: [data?.location || ''],
      achievements: [data?.achievements || []],
      description: [data?.description || '']
    });
  }

  addEducation(): void {
    this.editIndex = this.educations.length;
    this.educations.push(this.createEducationForm());
    this.showForm = true;
  }

  editEducation(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteEducation(index: number): void {
    this.educations.removeAt(index);
  }

  saveEducation(): void {
    if (this.educations.at(this.editIndex).valid) {
      this.showForm = false;
      this.editIndex = -1;
    }
  }

  cancelEdit(): void {
    if (this.editIndex === this.educations.length - 1) {
      this.educations.removeAt(this.editIndex);
    }
    this.showForm = false;
    this.editIndex = -1;
  }

  addAchievement(educationForm: FormGroup): void {
    const achievements = educationForm.get('achievements')?.value || [];
    achievements.push('');
    educationForm.patchValue({ achievements });
  }

  removeAchievement(educationForm: FormGroup, index: number): void {
    const achievements = educationForm.get('achievements')?.value || [];
    achievements.splice(index, 1);
    educationForm.patchValue({ achievements });
  }
}
