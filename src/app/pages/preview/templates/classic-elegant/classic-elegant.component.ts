import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-classic-elegant',
  template: `
    <div class="classic-elegant" *ngIf="resume">
      <!-- Header -->
      <header class="header">
        <h1 class="name">{{resume.personalInfo.fullName}}</h1>
        <p class="title">{{resume.personalInfo.title}}</p>
        
        <div class="contact-info">
          <div class="contact-item" *ngIf="resume.personalInfo.email">
            <i class="bi bi-envelope"></i>
            <a [href]="'mailto:' + resume.personalInfo.email">{{resume.personalInfo.email}}</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.phone">
            <i class="bi bi-telephone"></i>
            <a [href]="'tel:' + resume.personalInfo.phone">{{resume.personalInfo.phone}}</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.location">
            <i class="bi bi-geo-alt"></i>
            <span>{{resume.personalInfo.location}}</span>
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

      <!-- Summary -->
      <section class="summary" *ngIf="resume.summary">
        <h2>Professional Summary</h2>
        <p>{{ resume.summary }}</p>
      </section>

      <!-- Experience -->
      <section class="experience" *ngIf="resume.workExperience?.length">
        <h2>Professional Experience</h2>
        <div class="experience-list">
          <div *ngFor="let exp of resume.workExperience" class="experience-item">
            <div class="experience-header">
              <h3>{{exp.title}}</h3>
              <div class="company-info">
                <span class="company">{{exp.company}}</span>
              </div>
              <span class="date">{{exp.startDate}} - {{exp.endDate || 'Present'}}</span>
            </div>
            <p class="description" *ngIf="exp.description">{{exp.description}}</p>
            <ul class="achievements" *ngIf="exp.achievements?.length">
              <li *ngFor="let achievement of exp.achievements">{{achievement}}</li>
            </ul>
            <div class="tech-stack" *ngIf="exp.technologies?.length">
              <span class="tech-tag" *ngFor="let tech of exp.technologies">{{tech}}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="education" *ngIf="resume.education?.length">
        <h2>Education</h2>
        <div class="education-list">
          <div *ngFor="let edu of resume.education" class="education-item">
            <div class="education-header">
              <h3>{{edu.school}}</h3>
              <p class="degree">{{edu.degree}} in {{edu.field}}</p>
              <span class="date">{{edu.startDate}} - {{edu.endDate || 'Present'}}</span>
            </div>
            <p class="description" *ngIf="edu.description">{{edu.description}}</p>
            <ul class="achievements" *ngIf="edu.achievements?.length">
              <li *ngFor="let achievement of edu.achievements">{{achievement}}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section class="skills" *ngIf="resume.skills && (resume.skills.technical?.length || resume.skills.soft?.length)">
        <h2>Skills</h2>
        
        <!-- Technical Skills -->
        <div class="skills-group" *ngIf="resume.skills.technical?.length">
          <h3>Technical Skills</h3>
          <div class="skills-list">
            <div *ngFor="let skill of resume.skills.technical" class="skill-item">
              <span class="skill-name">{{ skill }}</span>
            </div>
          </div>
        </div>

        <!-- Soft Skills -->
        <div class="skills-group" *ngIf="resume.skills.soft?.length">
          <h3>Soft Skills</h3>
          <div class="skills-list">
            <div *ngFor="let skill of resume.skills.soft" class="skill-item">
              <span class="skill-name">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section class="projects" *ngIf="resume.projects?.length">
        <h2>Projects</h2>
        <div class="projects-list">
          <div *ngFor="let project of resume.projects" class="project-item">
            <h3>{{project.name}}</h3>
            <p class="description">{{project.description}}</p>
            <div class="tech-stack" *ngIf="project.technologies?.length">
              <span class="tech-tag" *ngFor="let tech of project.technologies">{{tech}}</span>
            </div>
            <div class="project-links" *ngIf="project.link">
              <a [href]="project.link" class="project-link" target="_blank">
                <i class="bi bi-link-45deg"></i> View Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Certifications -->
      <section class="certifications" *ngIf="resume.certifications?.length">
        <h2>Certifications</h2>
        <div class="certifications-list">
          <div *ngFor="let cert of resume.certifications" class="certification-item">
            <h3>{{cert.name}}</h3>
            <p class="organization">{{cert.organization}}</p>
            <span class="date">
              Issued: {{cert.issueDate}}
              <span *ngIf="cert.expiryDate"> | Expires: {{cert.expiryDate}}</span>
            </span>
            <p class="description" *ngIf="cert.description">{{cert.description}}</p>
            <p class="credential" *ngIf="cert.credentialId">
              Credential ID: 
              <a *ngIf="cert.credentialUrl" [href]="cert.credentialUrl" target="_blank">{{cert.credentialId}}</a>
              <span *ngIf="!cert.credentialUrl">{{cert.credentialId}}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .classic-elegant {
      max-width: 100%;
      margin: 0;
      padding: 0.4rem;
      font-family: 'Times New Roman', Times, serif;
      color: #000000;
      background: #ffffff;
      font-size: 0.7rem;
      line-height: 1.4;
    }

    .header {
      text-align: center;
      margin-bottom: 1rem;
      border-bottom: 2px solid #000000;
      padding-bottom: 1rem;
    }

    .name {
      font-size: 1.4rem;
      color: #000000;
      margin: 0;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .title {
      font-size: 1rem;
      color: #333333;
      margin: 0.2rem 0;
      font-style: italic;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 0.5rem 0;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.8rem;

      i {
        color: #000000;
      }

      a {
        color: #000000;
        text-decoration: none;
      }
    }

    section {
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1rem;
      color: #000000;
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-bottom: 1px solid #000000;
      padding-bottom: 0.2rem;
    }

    h3 {
      font-size: 0.9rem;
      color: #000000;
      margin: 0;
      font-weight: bold;
    }

    .summary {
      text-align: justify;
      font-size: 0.8rem;
      margin-bottom: 1rem;
    }

    .experience-list, .education-list, .projects-list, .certifications-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .experience-item, .education-item, .project-item, .certification-item {
      margin-bottom: 0.8rem;
    }

    .experience-header, .education-header {
      margin-bottom: 0.3rem;
    }

    .company-info {
      font-size: 0.8rem;
      margin: 0.1rem 0;
    }

    .company {
      font-weight: bold;
    }

    .date {
      font-size: 0.75rem;
      color: #666666;
      font-style: italic;
      display: block;
    }

    .description {
      font-size: 0.8rem;
      margin: 0.2rem 0;
      text-align: justify;
    }

    .achievements {
      margin: 0.2rem 0;
      padding-left: 1.2rem;
      list-style-type: disc;

      li {
        font-size: 0.8rem;
        margin-bottom: 0.2rem;
        text-align: justify;
      }
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.5rem 0;
    }

    .skill-item {
      font-size: 0.8rem;
    }

    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      margin-top: 0.3rem;
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.1rem 0.3rem;
      background: #f0f0f0;
      border-radius: 2px;
      color: #000000;
      font-style: italic;
    }

    .project-links {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.3rem;
    }

    .project-link {
      font-size: 0.75rem;
      color: #000000;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .degree {
      font-size: 0.8rem;
      color: #000000;
      margin: 0.1rem 0;
      font-style: italic;
    }

    .organization {
      font-size: 0.8rem;
      color: #000000;
      margin: 0.1rem 0;
      font-weight: bold;
    }

    .credential {
      font-size: 0.75rem;
      color: #666666;
      margin: 0.1rem 0;
    }

    @media print {
      .classic-elegant {
        padding: 0.2rem;
      }

      section {
        break-inside: avoid !important;
      }

      .experience-item, .project-item, .education-item, .certification-item {
        break-inside: avoid !important;
      }

      .tech-tag {
        background: #f0f0f0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `]
})
export class ClassicElegantComponent {
  @Input() resume!: Resume;
} 