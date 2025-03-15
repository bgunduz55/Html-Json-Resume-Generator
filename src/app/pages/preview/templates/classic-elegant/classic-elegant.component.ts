import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-classic-elegant',
  template: `
    <div class="classic-elegant" *ngIf="resume">
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
        <div class="experience-item" *ngFor="let exp of resume.workExperience">
          <div class="experience-header">
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
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Georgia', serif;
      color: #333;
      background: white;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #333;
    }

    .name {
      font-size: 2.5rem;
      color: #333;
      margin: 0;
      font-weight: normal;
    }

    .title {
      font-size: 1.5rem;
      color: #666;
      margin: 0.5rem 0;
      font-weight: normal;
      font-style: italic;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;

      i {
        color: #333;
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
      margin-bottom: 2rem;

      h3 {
        color: #333;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 2px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.5rem;
      }
    }

    .experience-item, .education-item, .project-item, .certification-item {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px dotted #ccc;

      &:last-child {
        border-bottom: none;
      }

      h4 {
        color: #333;
        margin: 0;
        font-size: 1.2rem;
        font-weight: normal;
      }
    }

    .company, .degree, .organization {
      color: #666;
      font-style: italic;
    }

    .date {
      color: #999;
      font-size: 0.9rem;
    }

    .description {
      color: #444;
      line-height: 1.6;
      margin: 0.5rem 0;
    }

    .achievements {
      margin: 0.5rem 0;
      padding-left: 1.5rem;

      li {
        color: #444;
        margin-bottom: 0.3rem;
      }
    }

    .tech-tag, .skill-tag {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      margin: 0.2rem;
      background: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 0.9rem;
      color: #666;
      font-family: 'Arial', sans-serif;
    }

    .project-link {
      display: inline-block;
      margin-top: 0.5rem;
      color: #666;
      text-decoration: none;
      font-style: italic;

      &:hover {
        color: #000;
      }
    }

    @media print {
      .classic-elegant {
        box-shadow: none;
        padding: 0;
      }

      section {
        break-inside: avoid;
      }
    }
  `]
})
export class ClassicElegantComponent {
  @Input() resume: Resume | null = null;
} 