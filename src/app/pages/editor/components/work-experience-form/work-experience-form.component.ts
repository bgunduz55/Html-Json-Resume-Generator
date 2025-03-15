import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResumeService } from '../../../../services/resume.service';
import { WorkExperience } from '../../../../models/resume.model';

@Component({
  selector: 'app-work-experience-form',
  templateUrl: './work-experience-form.component.html',
  styleUrls: ['./work-experience-form.component.scss']
})
export class WorkExperienceFormComponent implements OnInit, OnDestroy {
  @Input() data: WorkExperience[] = [];
  
  form: FormGroup;
  showForm = false;
  editIndex = -1;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      experiences: this.fb.array([])
    });
    this.subscription = new Subscription();
  }

  get experiences() {
    return this.form.get('experiences') as FormArray;
  }

  getExperienceForm(index: number): FormGroup {
    return this.experiences.at(index) as FormGroup;
  }

  ngOnInit(): void {
    if (this.data?.length) {
      this.data.forEach(exp => {
        this.experiences.push(this.createExperienceForm(exp));
      });
    }

    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        this.resumeService.updateWorkExperience(value.experiences);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createExperienceForm(data?: WorkExperience): FormGroup {
    return this.fb.group({
      company: [data?.company || '', Validators.required],
      title: [data?.title || '', Validators.required],
      location: [data?.location || '', Validators.required],
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || ''],
      description: [data?.description || '', Validators.required],
      achievements: [data?.achievements || []]
    });
  }

  addExperience(): void {
    this.editIndex = this.experiences.length;
    this.experiences.push(this.createExperienceForm());
    this.showForm = true;
  }

  editExperience(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  saveExperience(): void {
    if (this.experiences.at(this.editIndex).valid) {
      this.showForm = false;
      this.editIndex = -1;
    }
  }

  cancelEdit(): void {
    if (this.editIndex === this.experiences.length - 1) {
      this.experiences.removeAt(this.editIndex);
    }
    this.showForm = false;
    this.editIndex = -1;
  }

  addAchievement(experienceForm: FormGroup): void {
    const achievements = experienceForm.get('achievements')?.value || [];
    achievements.push('');
    experienceForm.patchValue({ achievements });
  }

  removeAchievement(experienceForm: FormGroup, index: number): void {
    const achievements = experienceForm.get('achievements')?.value || [];
    achievements.splice(index, 1);
    experienceForm.patchValue({ achievements });
  }
}
