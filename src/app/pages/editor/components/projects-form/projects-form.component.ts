import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ResumeService } from '../../../../services/resume.service';
import { Project } from '../../../../models/resume.model';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss']
})
export class ProjectsFormComponent implements OnInit, OnDestroy {
  @Input() data: Project[] = [];
  
  form: FormGroup;
  showForm = false;
  editIndex = -1;
  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.form = this.fb.group({
      projects: this.fb.array([])
    });
    this.subscription = new Subscription();
  }

  get projects() {
    return this.form.get('projects') as FormArray;
  }

  getProjectForm(index: number): FormGroup {
    return this.projects.at(index) as FormGroup;
  }

  ngOnInit(): void {
    if (this.data?.length) {
      this.data.forEach(project => {
        this.projects.push(this.createProjectForm(project));
      });
    }

    this.subscription.add(
      this.form.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        this.resumeService.updateProjects(value.projects);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createProjectForm(data?: Project): FormGroup {
    return this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '', Validators.required],
      role: [data?.role || ''],
      url: [data?.url || ''],
      startDate: [data?.startDate || '', Validators.required],
      endDate: [data?.endDate || ''],
      technologies: [data?.technologies || []],
      achievements: [data?.achievements || []]
    });
  }

  addProject(): void {
    this.editIndex = this.projects.length;
    this.projects.push(this.createProjectForm());
    this.showForm = true;
  }

  editProject(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteProject(index: number): void {
    this.projects.removeAt(index);
  }

  saveProject(): void {
    if (this.projects.at(this.editIndex).valid) {
      this.showForm = false;
      this.editIndex = -1;
    }
  }

  cancelEdit(): void {
    if (this.editIndex === this.projects.length - 1) {
      this.projects.removeAt(this.editIndex);
    }
    this.showForm = false;
    this.editIndex = -1;
  }

  addTechnology(projectForm: FormGroup): void {
    const technologies = projectForm.get('technologies')?.value || [];
    technologies.push('');
    projectForm.patchValue({ technologies });
  }

  removeTechnology(projectForm: FormGroup, index: number): void {
    const technologies = projectForm.get('technologies')?.value || [];
    technologies.splice(index, 1);
    projectForm.patchValue({ technologies });
  }

  addAchievement(projectForm: FormGroup): void {
    const achievements = projectForm.get('achievements')?.value || [];
    achievements.push('');
    projectForm.patchValue({ achievements });
  }

  removeAchievement(projectForm: FormGroup, index: number): void {
    const achievements = projectForm.get('achievements')?.value || [];
    achievements.splice(index, 1);
    projectForm.patchValue({ achievements });
  }
}
