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
      soft: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  private loadSkills(): void {
    this.resumeService.getResume().subscribe(resume => {
      if (resume?.skills) {
        const technicalArray = this.skillsForm.get('technical') as FormArray;
        const softArray = this.skillsForm.get('soft') as FormArray;

        technicalArray.clear();
        softArray.clear();

        resume.skills.technical.forEach(skill => {
          technicalArray.push(this.fb.control(skill));
        });

        resume.skills.soft.forEach(skill => {
          softArray.push(this.fb.control(skill));
        });
      }
    });
  }

  get technical(): FormArray {
    return this.skillsForm.get('technical') as FormArray;
  }

  get soft(): FormArray {
    return this.skillsForm.get('soft') as FormArray;
  }

  addTechnicalSkill(): void {
    this.technical.push(this.fb.control(''));
  }

  addSoftSkill(): void {
    this.soft.push(this.fb.control(''));
  }

  removeTechnicalSkill(index: number): void {
    this.technical.removeAt(index);
    this.saveChanges();
  }

  removeSoftSkill(index: number): void {
    this.soft.removeAt(index);
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.skillsForm.valid) {
      const skills: Skills = {
        technical: this.technical.value,
        soft: this.soft.value
      };
      this.resumeService.updateSkills(skills);
    }
  }
}
