import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../../shared/services/resume.service';
import { PersonalInfo, Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.scss']
})
export class PersonalInfoFormComponent implements OnInit {
  personalInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      summary: [''],
      location: ['', Validators.required],
      website: [''],
      linkedin: [''],
      github: [''],
      photo: ['']
    });
  }

  ngOnInit(): void {
    this.resumeService.getResume().subscribe((resume: Resume | null) => {
      if (resume?.personalInfo) {
        this.personalInfoForm.patchValue(resume.personalInfo);
        this.personalInfoForm.patchValue({
          summary: resume.summary
        });
        console.log(resume.personalInfo);
      }
    });
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.personalInfoForm.patchValue({
          photo: reader.result as string
        });
        this.saveChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.personalInfoForm.patchValue({
      photo: ''
    });
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.personalInfoForm.valid) {
      this.resumeService.updatePersonalInfo(this.personalInfoForm.value);
    }
  }
}
