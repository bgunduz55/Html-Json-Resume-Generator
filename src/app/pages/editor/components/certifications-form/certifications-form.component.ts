import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResumeService } from '../../../../services/resume.service';
import { Certification } from '../../../../models/resume.model';

@Component({
  selector: 'app-certifications-form',
  templateUrl: './certifications-form.component.html',
  styleUrls: ['./certifications-form.component.scss']
})
export class CertificationsFormComponent implements OnInit, OnDestroy {
  @Input() data: Certification[] = [];
  
  form: FormGroup;
  showForm = false;
  editIndex = -1;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      certifications: this.fb.array([])
    });
    this.subscription = new Subscription();
  }

  get certifications() {
    return this.form.get('certifications') as FormArray;
  }

  getCertificationForm(index: number): FormGroup {
    return this.certifications.at(index) as FormGroup;
  }

  ngOnInit(): void {
    if (this.data?.length) {
      this.data.forEach(cert => {
        this.certifications.push(this.createCertificationForm(cert));
      });
    }

    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        this.resumeService.updateCertifications(value.certifications);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createCertificationForm(data?: Certification): FormGroup {
    return this.fb.group({
      name: [data?.name || '', Validators.required],
      organization: [data?.organization || '', Validators.required],
      issueDate: [data?.issueDate || '', Validators.required],
      expiryDate: [data?.expiryDate || ''],
      credentialId: [data?.credentialId || ''],
      credentialUrl: [data?.credentialUrl || ''],
      description: [data?.description || '']
    });
  }

  addCertification(): void {
    this.editIndex = this.certifications.length;
    this.certifications.push(this.createCertificationForm());
    this.showForm = true;
  }

  editCertification(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  saveCertification(): void {
    if (this.certifications.at(this.editIndex).valid) {
      this.showForm = false;
      this.editIndex = -1;
    }
  }

  cancelEdit(): void {
    if (this.editIndex === this.certifications.length - 1) {
      this.certifications.removeAt(this.editIndex);
    }
    this.showForm = false;
    this.editIndex = -1;
  }
}
