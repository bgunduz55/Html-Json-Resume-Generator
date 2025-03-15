import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
