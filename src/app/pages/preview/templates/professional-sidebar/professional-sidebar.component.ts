import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-professional-sidebar',
  template: `
    <div class="professional-sidebar" *ngIf="resume">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="profile">
          <h1 class="name">{{ resume.personalInfo.fullName }}</h1>
          <h2 class="title">{{ resume.personalInfo.title }}</h2>
        </div>

        <div class="contact-info">
          <div class="contact-item" *ngIf="resume.personalInfo.email">
            <i class="bi bi-envelope"></i>
            <a [href]="'mailto:' + resume.personalInfo.email">{{ resume.personalInfo.email }}</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.phone">
            <i class="bi bi-telephone"></i>
            <a [href]="'tel:' + resume.personalInfo.phone">{{ resume.personalInfo.phone }}</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.location">
            <i class="bi bi-geo-alt"></i>
            <span>{{ resume.personalInfo.location }}</span>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.website">
            <i class="bi bi-globe"></i>
            <a [href]="resume.personalInfo.website" target="_blank">Portfolio</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.linkedin">
            <i class="bi bi-linkedin"></i>
            <a [href]="resume.personalInfo.linkedin" target="_blank">LinkedIn</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.github">
            <i class="bi bi-github"></i>
            <a [href]="resume.personalInfo.github" target="_blank">GitHub</a>
          </div>
        </div>

        <!-- Skills Section -->
        <section class="skills" *ngIf="resume.skills">
          <h3>Skills</h3>
          
          <div class="skills-group" *ngIf="resume.skills.programming_languages?.length">
            <h4>Programming Languages</h4>
            <div class="skills-list">
              <span *ngFor="let skill of resume.skills.programming_languages" class="skill-item">{{ skill }}</span>
            </div>
          </div>

          <div class="skills-group" *ngIf="resume.skills.frameworks_platforms?.length">
            <h4>Frameworks & Platforms</h4>
            <div class="skills-list">
              <span *ngFor="let skill of resume.skills.frameworks_platforms" class="skill-item">{{ skill }}</span>
            </div>
          </div>

          <div class="skills-group" *ngIf="resume.skills.cloud_infrastructure?.length">
            <h4>Cloud & Infrastructure</h4>
            <div class="skills-list">
              <span *ngFor="let skill of resume.skills.cloud_infrastructure" class="skill-item">{{ skill }}</span>
            </div>
          </div>

          <div class="skills-group" *ngIf="resume.skills.databases?.length">
            <h4>Databases</h4>
            <div class="skills-list">
              <span *ngFor="let skill of resume.skills.databases" class="skill-item">{{ skill }}</span>
            </div>
          </div>

          <div class="skills-group" *ngIf="resume.skills.methodologies_practices?.length">
            <h4>Methodologies & Practices</h4>
            <div class="skills-list">
              <span *ngFor="let skill of resume.skills.methodologies_practices" class="skill-item">{{ skill }}</span>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section class="education" *ngIf="resume.education?.length">
          <h3>Education</h3>
          <div class="education-item" *ngFor="let edu of resume.education">
            <div class="education-header">
              <h4>{{ edu.school }}</h4>
              <p class="degree">{{ edu.degree }} in {{ edu.field }}</p>
              <span class="date">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </span>
            </div>
            <p *ngIf="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
            <p *ngIf="edu.description" class="description">{{ edu.description }}</p>
            <!-- <ul class="achievements" *ngIf="edu.achievements?.length">
              <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
            </ul> -->
          </div>
        </section>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Summary Section -->
        <section class="summary" *ngIf="resume.summary">
          <h3>Professional Summary</h3>
          <p>{{ resume.summary }}</p>
        </section>

        <!-- Experience Section -->
        <section class="experience" *ngIf="resume.workExperience?.length">
          <h3>Work Experience</h3>
          <div class="experience-item" *ngFor="let exp of resume.workExperience">
            <div class="experience-header">
              <h4>{{ exp.title }}</h4>
              <span class="company">{{ exp.company }}</span>
              <span class="date">
                {{ exp.startDate | date:'MMM yyyy' }} - {{ exp.endDate ? (exp.endDate | date:'MMM yyyy') : 'Present' }}
              </span>
            </div>
            <p class="description">{{ exp.description }}</p>
            <div class="technologies" *ngIf="exp.technologies?.length">
              <span class="tech-tag" *ngFor="let tech of exp.technologies">{{ tech }}</span>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section class="projects" *ngIf="resume.projects?.length">
          <h3>Projects</h3>
          <div class="project-item" *ngFor="let project of resume.projects">
            <div class="project-header">
              <h4>{{ project.name }}</h4>
              <span class="date" *ngIf="project.startDate">
                {{ project.startDate }} - {{ project.endDate || 'Present' }}
              </span>
            </div>
            <p class="description">{{ project.description }}</p>
            <div class="technologies" *ngIf="project.technologies?.length">
              <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
            </div>
            <a class="project-link" *ngIf="project.link" [href]="project.link" target="_blank">View Project</a>
          </div>
        </section>

        <!-- Certifications Section -->
        <section class="certifications" *ngIf="resume.certifications?.length">
          <h3>Certifications</h3>
          <div class="certification-item" *ngFor="let cert of resume.certifications">
            <div class="certification-header">
              <h4>{{ cert.name }}</h4>
              <span class="organization">{{ cert.organization }}</span>
              <span class="date">{{ cert.issueDate | date:'MMM yyyy' }}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .professional-sidebar {
      display: flex;
      max-width: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Roboto', Arial, sans-serif;
      color: #2c3e50;
      background: #ffffff;
      font-size: 0.62rem;
      line-height: 1.2;
    }

    .sidebar {
      width: 24%;
      background: #f8f9fa;
      padding: 0.5rem;
      border-right: 1px solid #e9ecef;
      line-height: 1.5 !important;
    }

    .main-content {
      width: 76%;
      padding: 0.6rem;
    }

    .profile {
      text-align: left;
      margin-bottom: 0.3rem;
    }

    .name {
      font-size: 0.85rem;
      color: #2c3e50;
      margin: 0;
      font-weight: 600;
    }

    .title {
      font-size: 0.65rem;
      color: #6c757d;
      margin: 0.08rem 0;
      font-weight: normal;
    }

    .contact-info {
      margin-bottom: 0.4rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.12rem;
      margin-bottom: 0.12rem;
      font-size: 0.6rem;
      color: #495057;

      i {
        width: 0.65rem;
        color: #6c757d;
      }

      a {
        color: #495057;
        text-decoration: none;
        
        &:hover {
          color: #0056b3;
        }
      }
    }

    .skills {
      margin-bottom: 0.4rem;

      h3 {
        font-size: 0.68rem;
        margin: 0 0 0.2rem 0;
        padding-bottom: 0.08rem;
        border-bottom: 1px solid #dee2e6;
      }

      h4 {
        font-size: 0.6rem;
        margin: 0.15rem 0 0.08rem 0;
      }
    }

    .skills-group {
      margin-bottom: 0.25rem;
    }

    .skills-list {
      gap: 0.12rem;
      margin-bottom: 0.12rem;
    }

    .skill-item {
      font-size: 0.6rem;
      padding: 0.06rem 0.15rem;
    }

    .education {
      h3 {
        font-size: 0.68rem;
        margin: 0 0 0.2rem 0;
        padding-bottom: 0.08rem;
      }

      .education-item {
        margin-bottom: 0.25rem;
        padding-bottom: 0.25rem;
      }

      h4 {
        font-size: 0.65rem;
      }

      .degree {
        font-size: 0.6rem;
        margin: 0.06rem 0;
        color: #495057;
      }

      .date {
        font-size: 0.58rem;
        margin: 0.06rem 0;
      }

      .description {
        font-size: 0.6rem;
        margin: 0.12rem 0;
        line-height: 1.15;
      }
    }

    section {
      margin-bottom: 0.5rem;

      h3 {
        font-size: 0.7rem;
        color: #2c3e50;
        margin: 0 0 0.35rem 0;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        border-bottom: 1px solid #dee2e6;
        padding-bottom: 0.1rem;
      }
    }

    .experience-item, .project-item, .education-item, .certification-item {
      margin-bottom: 0.35rem;
      padding-bottom: 0.35rem;
      border-bottom: 1px solid #f1f3f5;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
    }

    .experience-header, .project-header, .education-header, .certification-header {
      margin-bottom: 0.15rem;
    }

    h4 {
      font-size: 0.68rem;
      color: #2c3e50;
      margin: 0;
      font-weight: 600;
    }

    .company, .organization, .school {
      display: block;
      font-size: 0.62rem;
      color: #495057;
      margin: 0.08rem 0;
    }

    .date {
      display: block;
      font-size: 0.62rem;
      color: #6c757d;
      margin: 0.08rem 0;
    }

    .description {
      font-size: 0.62rem;
      color: #495057;
      margin: 0.15rem 0;
      line-height: 1.2;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.15rem;
      margin-top: 0.15rem;
    }

    .tech-tag {
      font-size: 0.62rem;
      padding: 0.08rem 0.2rem;
      background: #e9ecef;
      border-radius: 2px;
      color: #495057;
    }

    @media print {
      .professional-sidebar {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .sidebar {
        background: #f8f9fa !important;
        width: 24% !important;
        border-right: 1px solid #dee2e6 !important;
      }

      .main-content {
        width: 76% !important;
      }

      .skill-item, .tech-tag {
        background: #e9ecef !important;
        border: 1px solid #dee2e6 !important;
        color: black !important;
      }

      section {
        break-inside: avoid !important;
      }

      .experience-item, .project-item, .education-item, .certification-item {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
        border-bottom: 1px solid #dee2e6 !important;
      }

      h3 {
        border-bottom: 1px solid #dee2e6 !important;
      }

      h3, h4 {
        color: black !important;
      }

      .company, .organization, .school, .description {
        color: black !important;
      }

      .date {
        color: #333 !important;
      }
    }
  `]
})
export class ProfessionalSidebarComponent {
  @Input() resume!: Resume;
} 