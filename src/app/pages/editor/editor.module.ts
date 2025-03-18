import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { WorkExperienceFormComponent } from './components/work-experience-form/work-experience-form.component';
import { EducationFormComponent } from './components/education-form/education-form.component';
import { SkillsFormComponent } from './components/skills-form/skills-form.component';
import { ProjectsFormComponent } from './components/projects-form/projects-form.component';
import { CertificationsFormComponent } from './components/certifications-form/certifications-form.component';
import { ResumeManagerComponent } from '../../components/resume-manager/resume-manager.component';

@NgModule({
  declarations: [
    EditorComponent,
    PersonalInfoFormComponent,
    WorkExperienceFormComponent,
    EducationFormComponent,
    SkillsFormComponent,
    ProjectsFormComponent,
    CertificationsFormComponent,
    ResumeManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditorComponent,
        children: [
          {
            path: '',
            redirectTo: 'personal-info',
            pathMatch: 'full'
          },
          {
            path: 'personal-info',
            component: PersonalInfoFormComponent
          },
          {
            path: 'work-experience',
            component: WorkExperienceFormComponent
          },
          {
            path: 'education',
            component: EducationFormComponent
          },
          {
            path: 'skills',
            component: SkillsFormComponent
          },
          {
            path: 'projects',
            component: ProjectsFormComponent
          },
          {
            path: 'certifications',
            component: CertificationsFormComponent
          }
        ]
      }
    ])
  ]
})
export class EditorModule { }
