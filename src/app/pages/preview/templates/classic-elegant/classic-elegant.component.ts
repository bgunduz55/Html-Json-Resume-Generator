import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-classic-elegant',
  template: `
    <div class="classic-elegant" *ngIf="resume">
      <!-- Header Section -->
      <header class="header">
        <div class="personal-info" style="text-align: center;">
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
        <p class="summary-text">{{ resume.summary }}</p>
      </section>

      <!-- Projects Section -->
      <section class="projects" *ngIf="resume.projects?.length">
        <h3>Projects</h3>
        <div class="project-item" *ngFor="let project of resume.projects">
          <div class="project-header">
            <h4>{{ project.name }}</h4>
            <span class="date">
              {{ project.startDate | date:'MMM yyyy' }} - 
              {{ project.current ? 'Present' : (project.endDate | date:'MMM yyyy') }}
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
      </section>

      <!-- Education Section -->
      <section class="education" *ngIf="resume.education?.length">
        <h3>Education</h3>
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
      </section>

      <!-- Experience Section -->
      <section class="experience" *ngIf="resume.workExperience?.length">
        <br>
        <h3>Work Experience</h3>
        <div class="experience-item" *ngFor="let exp of resume.workExperience">
          <div class="experience-header">
            <h4>{{ exp.title }}</h4>
            <span class="company">{{ exp.company }}</span>
            <span class="date">
              {{ exp.startDate | date:'MMM yyyy' }} - 
              {{ exp.current ? 'Present' : exp.endDate | date:'MMM yyyy' }}
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
    </div>
  `,
  styles: [`
    .classic-elegant {
      max-width: 100%;
      margin: 0;
      padding: 1.2rem 0.4rem 0.4rem 0.4rem;
      font-family: 'Arial', sans-serif;
      color: #2c3e50;
      background: #ffffff;
      font-size: 0.7rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .hero {
      margin-bottom: 0.4rem;
      text-align: center;
      border-bottom: 1px solid #2c3e50;
      padding-bottom: 0.2rem;
    }

    .name {
      font-size: 1.2rem;
      color: #2c3e50;
      margin: 0;
      line-height: 1.2;
      display: inline-block;
      margin-right: 0.5rem;
      font-weight: 600;
    }

    .title {
      font-size: 0.85rem;
      color: #7f8c8d;
      margin: 0;
      line-height: 1.2;
      display: inline-block;
      font-weight: normal;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 0.4rem;
      font-size: 0.7rem;
      line-height: 1;
      margin-top: 0.25rem;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 0.25rem;
      margin-bottom: 0.4rem;
      font-size: 0.7rem;
      line-height: 1.2;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      color: #666;

      i {
        color: #333;
        font-size: 0.8rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        
        &:hover {
          color: #000;
        }
      }
    }

    section {
      margin-bottom: 0.8rem;

      h3 {
        color: #333;
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.2rem;
      }
    }

    .experience-item, .education-item, .project-item, .certification-item {
      margin-bottom: 0.6rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px dotted #ccc;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      h4 {
        color: #333;
        margin: 0;
        font-size: 0.8rem;
        font-weight: normal;
      }
    }

    .company, .degree, .organization {
      color: #666;
      font-style: italic;
      font-size: 0.75rem;
    }

    .date {
      color: #999;
      font-size: 0.7rem;
    }

    .description {
      color: #444;
      line-height: 1.2;
      margin: 0.2rem 0;
      font-size: 0.7rem;
    }

    .achievements {
      margin: 0.2rem 0;
      padding-left: 1rem;

      li {
        color: #444;
        margin-bottom: 0.15rem;
        font-size: 0.7rem;
        line-height: 1.2;
      }
    }

    .tech-tag, .skill-tag {
      display: inline-block;
      padding: 0.1rem 0.3rem;
      margin: 0.1rem;
      background: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 2px;
      font-size: 0.65rem;
      color: #666;
      font-family: 'Arial', sans-serif;
    }

    .project-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #666;
      text-decoration: none;
      font-style: italic;
      font-size: 0.7rem;
    }

    .summary-text {
      font-size: 0.7rem;
      line-height: 1.2;
      color: #444;
      margin: 0.2rem 0;
    }

    .experience {
      margin-top: 0.6rem !important;
    }

    .education-item {
      margin-bottom: 0.15rem;
      padding-bottom: 0.15rem;
      border-bottom: 1px dotted #ccc;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .education-header {
        margin-bottom: 0.05rem;

        h4 {
          color: #333;
          margin: 0;
          font-size: 0.8rem;
          font-weight: normal;
          display: inline-block;
        }

        .degree {
          color: #666;
          font-style: italic;
          font-size: 0.75rem;
          margin-left: 0.15rem;
        }

        .date {
          color: #999;
          font-size: 0.7rem;
          display: block;
          margin-top: 0.05rem;
        }
      }

      .description {
        margin: 0.1rem 0;
      }

      .achievements {
        margin: 0.1rem 0;
        padding-left: 0.8rem;
      }
    }

    .education {
      padding-top: 0.6rem !important;
    }

    @media print {
      @page {
        margin: 0.3cm !important;
        size: A4;
        marks: none;
      }

      section {
        margin-bottom: 0.3rem !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .experience-item, .education-item, .project-item, .certification-item {
        break-inside: avoid !important;
      }

      .experience {
        break-before: auto !important;
        break-after: auto !important;
        margin-top: 0.6rem !important;
      }

      .education {
        break-before: auto !important;
        break-after: auto !important;
        margin-top: 0.6rem !important;
      }

      .projects {
        break-before: auto !important;
        break-after: auto !important;
      }

      .skills {
        break-before: auto !important;
        break-after: auto !important;
      }

      .certifications {
        break-before: auto !important;
        break-after: auto !important;
      }
    }
  `]
})
export class ClassicElegantComponent {
  @Input() resume: Resume | null = null;
} 