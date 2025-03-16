import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
      programming_languages: this.fb.array([]),
      frameworks_platforms: this.fb.array([]),
      cloud_infrastructure: this.fb.array([]),
      databases: this.fb.array([]),
      methodologies_practices: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  private loadSkills(): void {
    this.resumeService.currentResume$.subscribe(resume => {
      if (resume?.skills) {
        const skills = resume.skills;
        
        Object.keys(skills).forEach(key => {
          const skillArray = this.skillsForm.get(key) as FormArray;
          skillArray.clear();
          
          if (skills[key as keyof Skills]?.length) {
            skills[key as keyof Skills]?.forEach(skill => {
              skillArray.push(this.fb.control(skill));
            });
          }
        });
      }
    });
  }

  get programming_languages(): FormArray<FormControl<string | null>> {
    return this.skillsForm.get('programming_languages') as FormArray<FormControl<string | null>>;
  }

  get frameworks_platforms(): FormArray<FormControl<string | null>> {
    return this.skillsForm.get('frameworks_platforms') as FormArray<FormControl<string | null>>;
  }

  get cloud_infrastructure(): FormArray<FormControl<string | null>> {
    return this.skillsForm.get('cloud_infrastructure') as FormArray<FormControl<string | null>>;
  }

  get databases(): FormArray<FormControl<string | null>> {
    return this.skillsForm.get('databases') as FormArray<FormControl<string | null>>;
  }

  get methodologies_practices(): FormArray<FormControl<string | null>> {
    return this.skillsForm.get('methodologies_practices') as FormArray<FormControl<string | null>>;
  }

  addSkill(skillType: keyof Skills, skill: string): void {
    const skillArray = this.skillsForm.get(skillType) as FormArray<FormControl<string | null>>;
    skillArray.push(this.fb.control(skill));
    this.saveChanges();
  }

  removeSkill(skillType: keyof Skills, index: number): void {
    const skillArray = this.skillsForm.get(skillType) as FormArray<FormControl<string | null>>;
    skillArray.removeAt(index);
    this.saveChanges();
  }

  saveChanges(): void {
    if (this.skillsForm.valid) {
      const skills: Skills = {
        programming_languages: this.programming_languages.value.filter((skill): skill is string => skill !== null),
        frameworks_platforms: this.frameworks_platforms.value.filter((skill): skill is string => skill !== null),
        cloud_infrastructure: this.cloud_infrastructure.value.filter((skill): skill is string => skill !== null),
        databases: this.databases.value.filter((skill): skill is string => skill !== null),
        methodologies_practices: this.methodologies_practices.value.filter((skill): skill is string => skill !== null)
      };
      this.resumeService.updateSkills(skills);
    }
  }

  getSkillsData(): Skills {
    return {
      programming_languages: this.programming_languages.value.filter((skill): skill is string => skill !== null),
      frameworks_platforms: this.frameworks_platforms.value.filter((skill): skill is string => skill !== null),
      cloud_infrastructure: this.cloud_infrastructure.value.filter((skill): skill is string => skill !== null),
      databases: this.databases.value.filter((skill): skill is string => skill !== null),
      methodologies_practices: this.methodologies_practices.value.filter((skill): skill is string => skill !== null)
    };
  }
}
