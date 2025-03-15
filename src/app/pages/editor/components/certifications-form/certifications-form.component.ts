import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../../shared/services/resume.service';
import { Certification } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-certifications-form',
  templateUrl: './certifications-form.component.html',
  styleUrls: ['./certifications-form.component.scss']
})
export class CertificationsFormComponent implements OnInit {
  certificationsForm: FormGroup;
  editIndex: number = -1;
  showForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.certificationsForm = this.fb.group({
      certifications: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadCertifications();
  }

  private loadCertifications(): void {
    this.resumeService.getResume().subscribe(resume => {
      if (resume?.certifications) {
        const certificationsArray = this.certificationsForm.get('certifications') as FormArray;
        certificationsArray.clear();
        resume.certifications.forEach(cert => {
          certificationsArray.push(this.createCertificationForm(cert));
        });
      }
    });
  }

  get certifications(): FormArray {
    return this.certificationsForm.get('certifications') as FormArray;
  }

  createCertificationForm(certification: Partial<Certification> = {}): FormGroup {
    return this.fb.group({
      name: [certification.name || '', Validators.required],
      organization: [certification.organization || '', Validators.required],
      issueDate: [certification.issueDate || '', Validators.required],
      expiryDate: [certification.expiryDate || ''],
      credentialId: [certification.credentialId || ''],
      credentialUrl: [certification.credentialUrl || ''],
      description: [certification.description || '']
    });
  }

  addCertification(): void {
    this.editIndex = -1;
    this.showForm = true;
    this.certifications.push(this.createCertificationForm());
  }

  editCertification(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteCertification(index: number): void {
    this.certifications.removeAt(index);
    this.saveChanges();
  }

  getCertificationForm(index: number): FormGroup {
    return this.certifications.at(index) as FormGroup;
  }

  saveChanges(): void {
    if (this.certificationsForm.valid) {
      this.resumeService.updateCertifications(this.certificationsForm.value.certifications);
      if (this.editIndex === -1) {
        this.showForm = false;
      }
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editIndex = -1;
    this.loadCertifications();
  }
}
