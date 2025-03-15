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
            <a [href]="'mailto:' + resume.personalInfo.email" target="_blank">{{ resume.personalInfo.email }}</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.phone">
            <i class="bi bi-telephone"></i>
            <a [href]="'tel:' + resume.personalInfo.phone" target="_blank">{{ resume.personalInfo.phone }}</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.location">
            <i class="bi bi-geo-alt"></i>
            <span>{{ resume.personalInfo.location }}</span>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.website">
            <i class="bi bi-globe"></i>
            <a [href]="formatUrl(resume.personalInfo.website)" target="_blank">Portfolio</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.linkedin">
            <i class="bi bi-linkedin"></i>
            <a [href]="formatUrl(resume.personalInfo.linkedin)" target="_blank">LinkedIn</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.github">
            <i class="bi bi-github"></i>
            <a [href]="formatUrl(resume.personalInfo.github)" target="_blank">GitHub</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.playStore">
            <i class="bi bi-google-play"></i>
            <a [href]="formatUrl(resume.personalInfo.playStore)" target="_blank">Play Store</a>
          </div>
          <div class="contact-item" *ngIf="resume.personalInfo.appStore">
            <i class="bi bi-apple"></i>
            <a [href]="formatUrl(resume.personalInfo.appStore)" target="_blank">App Store</a>
          </div>
        </div>
      </header>

      <!-- Summary Section -->
      <section class="summary" *ngIf="resume.summary">
        <h3>Professional Summary</h3>
        <p [innerHTML]="formatText(resume.summary)"></p>
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
                  {{ formatDate(exp.startDate) }} - 
                  {{ exp.current ? 'Present' : formatDate(exp.endDate) }}
                </span>
              </div>
              <p class="description" [innerHTML]="formatText(exp.description)"></p>
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
                {{ formatDate(edu.startDate) }} - 
                {{ edu.current ? 'Present' : formatDate(edu.endDate) }}
              </span>
            </div>
            <p *ngIf="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
            <p *ngIf="edu.description" class="description" [innerHTML]="formatText(edu.description)"></p>
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
          <div class="database-skills" *ngIf="resume.skills.databases?.length">
            <h4>Database Skills</h4>
            <div class="skill-tags">
              <span class="skill-tag" *ngFor="let skill of resume.skills.databases">{{ skill }}</span>
            </div>
          </div>
          <div class="technology-skills" *ngIf="resume.skills.technologies?.length">
            <h4>Technologies</h4>
            <div class="skill-tags">
              <span class="skill-tag" *ngFor="let skill of resume.skills.technologies">{{ skill }}</span>
            </div>
          </div>
          <div class="program-skills" *ngIf="resume.skills.programs?.length">
            <h4>Programs & Tools</h4>
            <div class="skill-tags">
              <span class="skill-tag" *ngFor="let skill of resume.skills.programs">{{ skill }}</span>
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
              <span class="date" *ngIf="project.startDate">
                {{ formatDate(project.startDate) }} - {{ project.current ? 'Present' : formatDate(project.endDate) }}
              </span>
            </div>
            <p class="description" [innerHTML]="formatText(project.description)"></p>
            <ul class="achievements" *ngIf="project.achievements?.length">
              <li *ngFor="let achievement of project.achievements">{{ achievement }}</li>
            </ul>
            <div class="technologies" *ngIf="project.technologies?.length">
              <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
            </div>
            <a class="project-link" *ngIf="project.link" [href]="formatUrl(project.link)" target="_blank">View Project</a>
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
                Issued: {{ formatDate(cert.issueDate) }}
                <span *ngIf="cert.expiryDate"> | Expires: {{ formatDate(cert.expiryDate) }}</span>
              </span>
            </div>
            <p class="description" *ngIf="cert.description" [innerHTML]="formatText(cert.description)"></p>
            <p class="credential" *ngIf="cert.credentialId">
              Credential ID: 
              <a *ngIf="cert.credentialUrl" [href]="formatUrl(cert.credentialUrl)" target="_blank">{{ cert.credentialId }}</a>
              <span *ngIf="!cert.credentialUrl">{{ cert.credentialId }}</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .modern-professional {
      max-width: 100%;
      margin: 0;
      padding: 0.5rem;
      font-family: 'Inter', sans-serif;
      color: #2c3e50;
      background: white;
      font-size: 0.7rem;
    }

    .header {
      margin-bottom: 0.35rem;
      border-bottom: 1px solid #3498db;
      padding-bottom: 0.15rem;
    }

    .personal-info {
      margin-bottom: 0.25rem;
    }

    .name {
      font-size: 1.2rem;
      color: #2c3e50;
      margin: 0;
      line-height: 1.1;
    }

    .title {
      font-size: 0.85rem;
      color: #7f8c8d;
      margin: 0.15rem 0;
      line-height: 1.1;
    }

    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 0.2rem;
      font-size: 0.65rem;
      line-height: 1.1;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      color: #34495e;

      i {
        color: #3498db;
        font-size: 0.7rem;
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
      margin-bottom: 0.35rem;
      padding-bottom: 0.15rem;
      border-bottom: 1px solid #ecf0f1;

      h3 {
        color: #2c3e50;
        font-size: 0.9rem;
        margin-bottom: 0.25rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #3498db;
        line-height: 1.1;
      }
    }

    .timeline-item {
      margin-bottom: 0.35rem;
      padding-left: 0.75rem;
      border-left: 1px solid #3498db;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -4px;
        top: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #3498db;
      }

      &:last-child {
        margin-bottom: 0.15rem;
      }
    }

    .role-header {
      margin-bottom: 0.15rem;
      line-height: 1.1;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.8rem;
      }

      .company {
        color: #7f8c8d;
        font-size: 0.75rem;
      }

      .date {
        color: #95a5a6;
        font-size: 0.65rem;
      }
    }

    .description {
      color: #34495e;
      line-height: 1.1;
      margin: 0.15rem 0;
      font-size: 0.7rem;
    }

    .achievements {
      margin: 0.15rem 0;
      padding-left: 0.75rem;

      li {
        color: #34495e;
        margin-bottom: 0.1rem;
        font-size: 0.7rem;
        line-height: 1.1;
      }

      li:last-child {
        margin-bottom: 0;
      }
    }

    .tech-tag, .skill-tag {
      display: inline-block;
      padding: 0.1rem 0.25rem;
      margin: 0.05rem;
      background: #ecf0f1;
      border-radius: 4px;
      font-size: 0.65rem;
      color: #2c3e50;
      line-height: 1;
    }

    .education-item, .project-item, .certification-item {
      margin-bottom: 0.35rem;
      padding: 0.25rem;
      background: #f8f9fa;
      border-radius: 3px;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.8rem;
        line-height: 1.1;
      }

      &:last-child {
        margin-bottom: 0.15rem;
      }
    }

    .project-link {
      display: inline-block;
      margin-top: 0.15rem;
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.7rem;
    }

    .skills-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.25rem;

      h4 {
        font-size: 0.75rem;
        margin-bottom: 0.1rem;
        line-height: 1.1;
      }
    }

    @media print {
      @page {
        margin: 0.3cm;
        size: A4;
      }

      .modern-professional {
        box-shadow: none;
        padding: 0;
        font-size: 0.7rem !important;
        max-width: 100%;
        margin: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .header {
        margin-bottom: 0.25rem !important;
        padding-bottom: 0.15rem !important;
      }

      .name {
        font-size: 1.1rem !important;
        line-height: 1 !important;
      }

      .title {
        font-size: 0.8rem !important;
        margin: 0.1rem 0 !important;
        line-height: 1 !important;
      }

      .contact-info {
        font-size: 0.65rem !important;
        gap: 0.15rem !important;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
        line-height: 1 !important;
      }

      section {
        break-inside: avoid;
        margin-bottom: 0.25rem !important;
        padding-bottom: 0.15rem !important;

        h3 {
          font-size: 0.85rem !important;
          margin-bottom: 0.2rem !important;
          padding-bottom: 0.1rem !important;
          line-height: 1 !important;
        }

        &:last-child {
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
          border-bottom: none;
        }
      }

      .role-header {
        margin-bottom: 0.1rem !important;
        line-height: 1 !important;

        h4 {
          font-size: 0.75rem !important;
        }

        .company {
          font-size: 0.7rem !important;
        }

        .date {
          font-size: 0.65rem !important;
        }
      }

      .description {
        font-size: 0.7rem !important;
        line-height: 1.1 !important;
        margin: 0.1rem 0 !important;
      }

      .achievements {
        margin: 0.1rem 0 !important;
        padding-left: 0.5rem !important;

        li {
          font-size: 0.7rem !important;
          margin-bottom: 0.05rem !important;
          line-height: 1.1 !important;
        }
      }

      .tech-tag, .skill-tag {
        font-size: 0.65rem !important;
        padding: 0.05rem 0.2rem !important;
        margin: 0.05rem !important;
        border: 1px solid #3498db;
        background: none;
        line-height: 1 !important;
      }

      .timeline-item {
        margin-bottom: 0.25rem !important;
        padding-left: 0.5rem !important;

        &:before {
          width: 5px !important;
          height: 5px !important;
          left: -3px !important;
        }

        &:last-child {
          margin-bottom: 0.1rem !important;
        }
      }

      .education-item, .project-item, .certification-item {
        padding: 0.15rem !important;
        margin-bottom: 0.25rem !important;
        background: none !important;
        border: 1px solid #ecf0f1;

        h4 {
          font-size: 0.75rem !important;
          line-height: 1 !important;
        }

        &:last-child {
          margin-bottom: 0.1rem !important;
        }
      }

      .skills-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
        gap: 0.2rem !important;

        h4 {
          font-size: 0.75rem !important;
          margin-bottom: 0.1rem !important;
          line-height: 1 !important;
        }
      }

      .project-link {
        font-size: 0.7rem !important;
        margin-top: 0.1rem !important;
      }
    }
  `]
})
export class ModernProfessionalComponent {
  @Input() resume: Resume | null = null;

  formatUrl(url: string | undefined): string {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return date;
    }
  }

  formatText(text: string | undefined): string {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
  }
} 