import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../../../../shared/services/resume.service';
import { Skills } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {
  skillsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.skillsForm = this.fb.group({
      technical: this.fb.array([]),
      soft: this.fb.array([]),
      databases: this.fb.array([]),
      technologies: this.fb.array([]),
      programs: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  private loadSkills(): void {
    this.resumeService.currentResume$.subscribe(resume => {
      if (resume?.skills) {
        const technicalArray = this.skillsForm.get('technical') as FormArray;
        const softArray = this.skillsForm.get('soft') as FormArray;
        const databasesArray = this.skillsForm.get('databases') as FormArray;
        const technologiesArray = this.skillsForm.get('technologies') as FormArray;
        const programsArray = this.skillsForm.get('programs') as FormArray;

        technicalArray.clear();
        softArray.clear();
        databasesArray.clear();
        technologiesArray.clear();
        programsArray.clear();

        if (resume.skills.technical?.length) {
          resume.skills.technical.forEach(skill => {
            technicalArray.push(this.fb.control(skill));
          });
        }

        if (resume.skills.soft?.length) {
          resume.skills.soft.forEach(skill => {
            softArray.push(this.fb.control(skill));
          });
        }

        if (resume.skills.databases?.length) {
          resume.skills.databases.forEach(skill => {
            databasesArray.push(this.fb.control(skill));
          });
        }

        if (resume.skills.technologies?.length) {
          resume.skills.technologies.forEach(skill => {
            technologiesArray.push(this.fb.control(skill));
          });
        }

        if (resume.skills.programs?.length) {
          resume.skills.programs.forEach(skill => {
            programsArray.push(this.fb.control(skill));
          });
        }
      }
    });
  }

  get technical(): FormArray {
    return this.skillsForm.get('technical') as FormArray;
  }

  get soft(): FormArray {
    return this.skillsForm.get('soft') as FormArray;
  }

  get databases(): FormArray {
    return this.skillsForm.get('databases') as FormArray;
  }

  get technologies(): FormArray {
    return this.skillsForm.get('technologies') as FormArray;
  }

  get programs(): FormArray {
    return this.skillsForm.get('programs') as FormArray;
  }

  addTechnicalSkill(): void {
    this.technical.push(this.fb.control(''));
  }

  addSoftSkill(): void {
    this.soft.push(this.fb.control(''));
  }

  addDatabaseSkill(): void {
    this.databases.push(this.fb.control(''));
  }

  addTechnologySkill(): void {
    this.technologies.push(this.fb.control(''));
  }

  addProgramSkill(): void {
    this.programs.push(this.fb.control(''));
  }

  removeTechnicalSkill(index: number): void {
    this.technical.removeAt(index);
    this.saveChanges();
  }

  removeSoftSkill(index: number): void {
    this.soft.removeAt(index);
    this.saveChanges();
  }

  removeDatabaseSkill(index: number): void {
    this.databases.removeAt(index);
    this.saveChanges();
  }

  removeTechnologySkill(index: number): void {
    this.technologies.removeAt(index);
    this.saveChanges();
  }

  removeProgramSkill(index: number): void {
    this.programs.removeAt(index);
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.skillsForm.valid) {
      const skills: Skills = {
        technical: this.technical.value,
        soft: this.soft.value,
        databases: this.databases.value,
        technologies: this.technologies.value,
        programs: this.programs.value
      };
      this.resumeService.updateSkills(skills);
    }
  }
}
