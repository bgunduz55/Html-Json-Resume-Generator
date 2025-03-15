import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../../shared/services/resume.service';
import { Project } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.scss']
})
export class ProjectsFormComponent implements OnInit {
  projectsForm: FormGroup;
  editIndex: number = -1;
  showForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.projectsForm = this.fb.group({
      projects: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.resumeService.getResume().subscribe(resume => {
      if (resume?.projects) {
        const projectsArray = this.projectsForm.get('projects') as FormArray;
        projectsArray.clear();
        resume.projects.forEach(project => {
          projectsArray.push(this.createProjectForm(project));
        });
      }
    });
  }

  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  createProjectForm(project: Partial<Project> = {}): FormGroup {
    return this.fb.group({
      name: [project.name || '', Validators.required],
      description: [project.description || '', Validators.required],
      startDate: [project.startDate || '', Validators.required],
      endDate: [project.endDate || ''],
      current: [project.current || false],
      technologies: this.fb.array(project.technologies || []),
      link: [project.link || ''],
      achievements: this.fb.array(project.achievements || [])
    });
  }

  addProject(): void {
    this.editIndex = -1;
    this.showForm = true;
    this.projects.push(this.createProjectForm());
  }

  editProject(index: number): void {
    this.editIndex = index;
    this.showForm = true;
  }

  deleteProject(index: number): void {
    this.projects.removeAt(index);
    this.saveChanges();
  }

  getProjectForm(index: number): FormGroup {
    return this.projects.at(index) as FormGroup;
  }

  getTechnologies(projectIndex: number): FormArray {
    return this.getProjectForm(projectIndex).get('technologies') as FormArray;
  }

  addTechnology(projectIndex: number): void {
    this.getTechnologies(projectIndex).push(this.fb.control(''));
  }

  removeTechnology(projectIndex: number, techIndex: number): void {
    this.getTechnologies(projectIndex).removeAt(techIndex);
    this.saveChanges();
  }

  getAchievements(projectIndex: number): FormArray {
    return this.getProjectForm(projectIndex).get('achievements') as FormArray;
  }

  addAchievement(projectIndex: number): void {
    this.getAchievements(projectIndex).push(this.fb.control(''));
  }

  removeAchievement(projectIndex: number, achievementIndex: number): void {
    this.getAchievements(projectIndex).removeAt(achievementIndex);
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.projectsForm.valid) {
      this.resumeService.updateProjects(this.projectsForm.value.projects);
      if (this.editIndex === -1) {
        this.showForm = false;
      }
    }
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editIndex = -1;
    this.loadProjects();
  }
}
