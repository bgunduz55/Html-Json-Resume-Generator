import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorComponent } from './editor.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { WorkExperienceFormComponent } from './components/work-experience-form/work-experience-form.component';
import { EducationFormComponent } from './components/education-form/education-form.component';
import { SkillsFormComponent } from './components/skills-form/skills-form.component';
import { ProjectsFormComponent } from './components/projects-form/projects-form.component';
import { CertificationsFormComponent } from './components/certifications-form/certifications-form.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [
    EditorComponent,
    PersonalInfoFormComponent,
    WorkExperienceFormComponent,
    EducationFormComponent,
    SkillsFormComponent,
    ProjectsFormComponent,
    CertificationsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EditorModule { }
