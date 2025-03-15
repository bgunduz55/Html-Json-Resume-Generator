import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-modern-professional',
  template: `
    <div class="modern-professional" *ngIf="resume">
      <!-- Header Section -->
      <header class="header">
        <div class="personal-info">
          <h1 class="name">{{ resume.personalInfo.fullName || 'Your Name' }}</h1>
          <h2 class="title">{{ resume.personalInfo.title || 'Your Professional Title' }}</h2>
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
      </header>

      <!-- Summary Section -->
      <section class="summary" *ngIf="resume.summary">
        <h3>Professional Summary</h3>
        <p>{{ resume.summary }}</p>
      </section>

      <!-- Experience Section -->
      <section class="experience" *ngIf="resume.workExperience?.length">
        <h3>Work Experience</h3>
        <div class="timeline">
          <div class="timeline-item" *ngFor="let exp of resume.workExperience">
            <div class="timeline-content">
              <div class="role-header">
                <h4>{{ exp.title }}</h4>
                <span class="company">{{ exp.company }}</span>
                <span class="date">
                  {{ exp.startDate | date:'MMM yyyy' }} - 
                  {{ exp.current ? 'Present' : (exp.endDate | date:'MMM yyyy') }}
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
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="education" *ngIf="resume.education?.length">
        <h3>Education</h3>
        <div class="education-items">
          <div class="education-item" *ngFor="let edu of resume.education">
            <div class="education-header">
              <h4>{{ edu.school }}</h4>
              <span class="degree">{{ edu.degree }} in {{ edu.field }}</span>
              <span class="date">
                {{ edu.startDate | date:'MMM yyyy' }} - 
                {{ edu.current ? 'Present' : (edu.endDate | date:'MMM yyyy') }}
              </span>
            </div>
            <p *ngIf="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
            <p *ngIf="edu.description" class="description">{{ edu.description }}</p>
            <ul class="achievements" *ngIf="edu.achievements?.length">
              <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="skills" *ngIf="resume.skills?.technical?.length || resume.skills?.soft?.length">
        <h3>Skills</h3>
        <div class="skills-container">
          <div class="technical-skills" *ngIf="resume.skills.technical?.length">
            <h4>Technical Skills</h4>
            <div class="skill-tags">
              <span class="skill-tag" *ngFor="let skill of resume.skills.technical">{{ skill }}</span>
            </div>
          </div>
          <div class="soft-skills" *ngIf="resume.skills.soft?.length">
            <h4>Soft Skills</h4>
            <div class="skill-tags">
              <span class="skill-tag" *ngFor="let skill of resume.skills.soft">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="projects" *ngIf="resume.projects?.length">
        <h3>Projects</h3>
        <div class="project-items">
          <div class="project-item" *ngFor="let project of resume.projects">
            <div class="project-header">
              <h4>{{ project.name }}</h4>
              <span class="date">
                {{ project.startDate }} - {{ project.current ? 'Present' : project.endDate }}
              </span>
            </div>
            <p class="description">{{ project.description }}</p>
            <ul class="achievements" *ngIf="project.achievements?.length">
              <li *ngFor="let achievement of project.achievements">{{ achievement }}</li>
            </ul>
            <div class="technologies" *ngIf="project.technologies?.length">
              <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
            </div>
            <a class="project-link" *ngIf="project.link" [href]="project.link" target="_blank">View Project</a>
          </div>
        </div>
      </section>

      <!-- Certifications Section -->
      <section class="certifications" *ngIf="resume.certifications?.length">
        <h3>Certifications</h3>
        <div class="certification-items">
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
        </div>
      </section>
    </div>
  `,
  styles: [`
    .modern-professional {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
      color: #2c3e50;
      background: white;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    .header {
      margin-bottom: 2rem;
      border-bottom: 3px solid #3498db;
      padding-bottom: 1rem;
    }

    .personal-info {
      margin-bottom: 1rem;
    }

    .name {
      font-size: 2.5rem;
      color: #2c3e50;
      margin: 0;
    }

    .title {
      font-size: 1.5rem;
      color: #7f8c8d;
      margin: 0.5rem 0;
    }

    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #34495e;

      i {
        color: #3498db;
      }

      a {
        color: inherit;
        text-decoration: none;
        
        &:hover {
          color: #3498db;
        }
      }
    }

    section {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #ecf0f1;

      h3 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #3498db;
      }
    }

    .timeline-item {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
      border-left: 2px solid #3498db;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -8px;
        top: 0;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #3498db;
      }
    }

    .role-header {
      margin-bottom: 0.5rem;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 1.2rem;
      }

      .company {
        color: #7f8c8d;
        font-size: 1rem;
      }

      .date {
        color: #95a5a6;
        font-size: 0.9rem;
      }
    }

    .description {
      color: #34495e;
      line-height: 1.6;
      margin: 0.5rem 0;
    }

    .achievements {
      margin: 0.5rem 0;
      padding-left: 1.5rem;

      li {
        color: #34495e;
        margin-bottom: 0.3rem;
      }
    }

    .tech-tag, .skill-tag {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      margin: 0.2rem;
      background: #ecf0f1;
      border-radius: 15px;
      font-size: 0.9rem;
      color: #2c3e50;
      transition: background-color 0.2s;

      &:hover {
        background: #3498db;
        color: white;
      }
    }

    .education-item, .project-item, .certification-item {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 1.2rem;
      }
    }

    .project-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #3498db;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }

    @media print {
      .modern-professional {
        box-shadow: none;
        padding: 0;
      }

      .tech-tag, .skill-tag {
        border: 1px solid #3498db;
        background: none;
      }

      section {
        break-inside: avoid;
      }
    }
  `]
})
export class ModernProfessionalComponent {
  @Input() resume: Resume | null = null;
} 