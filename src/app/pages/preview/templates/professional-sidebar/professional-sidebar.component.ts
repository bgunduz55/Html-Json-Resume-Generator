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
          <h2 class="title">{{ resume.personalInfo.title || 'Professional Title' }}</h2>
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
          <div class="skills-group" *ngIf="resume.skills.technical?.length">
            <h4>Technical Skills</h4>
            <div class="skills-list">
              <div *ngFor="let skill of resume.skills.technical" class="skill-item">
                <span class="skill-name">{{ skill }}</span>
              </div>
            </div>
          </div>

          <div class="skills-group" *ngIf="resume.skills.soft?.length">
            <h4>Soft Skills</h4>
            <div class="skills-list">
              <div *ngFor="let skill of resume.skills.soft" class="skill-item">
                <span class="skill-name">{{ skill }}</span>
              </div>
            </div>
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
                {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
              </span>
            </div>
            <p class="description">{{ exp.description }}</p>
            <ul class="achievements" *ngIf="exp.achievements?.length">
              <li *ngFor="let achievement of exp.achievements">{{ achievement }}</li>
            </ul>
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

        <!-- Education Section -->
        <section class="education" *ngIf="resume.education?.length">
          <h3>Education</h3>
          <div class="education-item" *ngFor="let edu of resume.education">
            <div class="education-header">
              <h4>{{ edu.school }}</h4>
              <span class="degree">{{ edu.degree }} in {{ edu.field }}</span>
              <span class="date">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </span>
            </div>
            <p *ngIf="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
            <p *ngIf="edu.description" class="description">{{ edu.description }}</p>
            <ul class="achievements" *ngIf="edu.achievements?.length">
              <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
            </ul>
          </div>
        </section>

        <!-- Certifications Section -->
        <section class="certifications" *ngIf="resume.certifications?.length">
          <h3>Certifications</h3>
          <div class="certification-item" *ngFor="let cert of resume.certifications">
            <div class="certification-header">
              <h4>{{ cert.name }}</h4>
              <span class="organization">{{ cert.organization }}</span>
              <span class="date">
                Issued: {{ cert.issueDate }}
                <span *ngIf="cert.expiryDate"> | Expires: {{ cert.expiryDate }}</span>
              </span>
            </div>
            <p class="description" *ngIf="cert.description">{{ cert.description }}</p>
            <p class="credential" *ngIf="cert.credentialId">
              Credential ID: 
              <a *ngIf="cert.credentialUrl" [href]="cert.credentialUrl" target="_blank">{{ cert.credentialId }}</a>
              <span *ngIf="!cert.credentialUrl">{{ cert.credentialId }}</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .professional-sidebar {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 1rem;
      max-width: 100%;
      margin: 0;
      padding: 0.4rem;
      font-family: 'Arial', sans-serif;
      color: #2c3e50;
      background: #ffffff;
      font-size: 0.7rem;
    }

    .sidebar {
      background: #f8f9fa;
      padding: 1rem;
      border-right: 1px solid #e9ecef;
    }

    .profile {
      text-align: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dee2e6;
    }

    .name {
      font-size: 1.1rem;
      color: #2c3e50;
      margin: 0;
      font-weight: 600;
    }

    .title {
      font-size: 0.8rem;
      color: #6c757d;
      margin: 0.2rem 0 0 0;
    }

    .contact-info {
      margin-bottom: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.7rem;

      i {
        color: #3498db;
        width: 1rem;
        text-align: center;
      }

      a {
        color: #2c3e50;
        text-decoration: none;

        &:hover {
          color: #3498db;
        }
      }
    }

    .social-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #2c3e50;
      text-decoration: none;
      font-size: 0.7rem;

      i {
        color: #3498db;
        width: 1rem;
        text-align: center;
      }

      &:hover {
        color: #3498db;
      }
    }

    .skills-section, .languages-section {
      margin-bottom: 1rem;

      h3 {
        font-size: 0.8rem;
        color: #2c3e50;
        margin: 0 0 0.5rem 0;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #dee2e6;
      }
    }

    .skill-item {
      margin-bottom: 0.5rem;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      font-size: 0.7rem;
    }

    .skill-bar {
      height: 4px;
      background: #e9ecef;
      border-radius: 2px;
      overflow: hidden;
    }

    .skill-progress {
      height: 100%;
      background: #3498db;
      border-radius: 2px;
    }

    .language-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.3rem;
      font-size: 0.7rem;
    }

    .main-content {
      padding: 0 0.4rem;
    }

    section {
      margin-bottom: 1rem;

      h3 {
        font-size: 0.8rem;
        color: #2c3e50;
        margin: 0 0 0.5rem 0;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #3498db;
      }
    }

    .summary-text {
      font-size: 0.7rem;
      line-height: 1.4;
      color: #2c3e50;
      margin: 0;
    }

    .timeline {
      position: relative;
      padding-left: 1rem;
    }

    .timeline-item {
      position: relative;
      padding-bottom: 1rem;

      &:before {
        content: '';
        position: absolute;
        left: -0.5rem;
        top: 0.25rem;
        width: 0.5rem;
        height: 0.5rem;
        background: #3498db;
        border-radius: 50%;
      }

      &:after {
        content: '';
        position: absolute;
        left: -0.25rem;
        top: 0.5rem;
        bottom: 0;
        width: 1px;
        background: #dee2e6;
      }

      &:last-child {
        padding-bottom: 0;

        &:after {
          display: none;
        }
      }
    }

    .timeline-content {
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 4px;

      h4 {
        font-size: 0.75rem;
        color: #2c3e50;
        margin: 0;
        font-weight: 600;
      }
    }

    .company-info {
      margin: 0.2rem 0;
      font-size: 0.7rem;
    }

    .company {
      color: #6c757d;
    }

    .date {
      color: #6c757d;
      margin-left: 0.5rem;
    }

    .description {
      font-size: 0.7rem;
      line-height: 1.4;
      margin: 0.3rem 0;
      color: #2c3e50;
    }

    .achievements {
      margin: 0.3rem 0;
      padding-left: 1rem;
      list-style-type: none;

      li {
        font-size: 0.7rem;
        line-height: 1.4;
        margin-bottom: 0.2rem;
        position: relative;

        &:before {
          content: "•";
          position: absolute;
          left: -0.8rem;
          color: #3498db;
        }
      }
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      margin-top: 0.3rem;
    }

    .tech-tag {
      font-size: 0.65rem;
      padding: 0.1rem 0.3rem;
      background: #e9ecef;
      border-radius: 3px;
      color: #2c3e50;
    }

    .projects-grid {
      display: grid;
      gap: 0.5rem;
    }

    .project-card {
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 4px;

      h4 {
        font-size: 0.75rem;
        color: #2c3e50;
        margin: 0;
        font-weight: 600;
      }
    }

    .project-links {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.3rem;
    }

    .project-link {
      font-size: 0.7rem;
      color: #3498db;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.2rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .education-grid {
      display: grid;
      gap: 0.5rem;
    }

    .education-item {
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 4px;

      h4 {
        font-size: 0.75rem;
        color: #2c3e50;
        margin: 0;
        font-weight: 600;
      }

      .degree {
        font-size: 0.7rem;
        color: #6c757d;
        margin: 0.2rem 0;
      }
    }

    .certifications-grid {
      display: grid;
      gap: 0.5rem;
    }

    .certification-card {
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 4px;

      h4 {
        font-size: 0.75rem;
        color: #2c3e50;
        margin: 0;
        font-weight: 600;
      }

      .issuer {
        font-size: 0.7rem;
        color: #6c757d;
        margin: 0.2rem 0;
      }
    }

    @media print {
      .professional-sidebar {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .sidebar {
        background: #f8f9fa !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .timeline-content, .project-card, .education-item, .certification-card {
        background: #f8f9fa !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .tech-tag {
        background: #e9ecef !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      section {
        break-inside: avoid !important;
      }

      .timeline-item, .project-card, .education-item, .certification-card {
        break-inside: avoid !important;
      }
    }
  `]
})
export class ProfessionalSidebarComponent {
  @Input() resume!: Resume;
} 