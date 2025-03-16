import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-creative-portfolio',
  template: `
    <div class="creative-portfolio" *ngIf="resume">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="name">{{ resume.personalInfo?.fullName || 'Your Name' }}</h1>
          <h2 class="title">{{ resume.personalInfo?.title || 'Your Professional Title' }}</h2>
          <div class="social-links">
            <a *ngIf="resume.personalInfo?.linkedin" [href]="formatUrl(resume.personalInfo?.linkedin)" target="_blank" class="social-link">
              <i class="bi bi-linkedin"></i>
            </a>
            <a *ngIf="resume.personalInfo?.github" [href]="formatUrl(resume.personalInfo?.github)" target="_blank" class="social-link">
              <i class="bi bi-github"></i>
            </a>
            <a *ngIf="resume.personalInfo?.website" [href]="formatUrl(resume.personalInfo?.website)" target="_blank" class="social-link">
              <i class="bi bi-globe"></i>
            </a>
          </div>
        </div>
      </section>

      <!-- Contact Info -->
      <section class="contact-info">
        <div class="contact-item" *ngIf="resume.personalInfo?.email">
          <i class="bi bi-envelope"></i>
          <a [href]="'mailto:' + resume.personalInfo?.email">{{ resume.personalInfo?.email }}</a>
        </div>
        <div class="contact-item" *ngIf="resume.personalInfo?.phone">
          <i class="bi bi-telephone"></i>
          <a [href]="'tel:' + resume.personalInfo?.phone">{{ resume.personalInfo?.phone }}</a>
        </div>
        <div class="contact-item" *ngIf="resume.personalInfo?.location">
          <i class="bi bi-geo-alt"></i>
          <span>{{ resume.personalInfo?.location }}</span>
        </div>
      </section>

      <!-- Summary Section -->
      <section class="summary" *ngIf="resume.summary">
        <div class="section-content">
          <h3>About Me</h3>
          <p [innerHTML]="formatText(resume.summary)"></p>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="skills" *ngIf="resume.skills?.technical?.length || resume.skills?.soft?.length">
        <div class="section-content">
          <h3>Skills & Expertise</h3>
          <div class="skills-grid">
            <div class="technical-skills" *ngIf="resume.skills?.technical?.length">
              <h4>Technical Skills</h4>
              <div class="skill-tags">
                <span class="skill-tag" *ngFor="let skill of resume.skills?.technical">{{ skill }}</span>
              </div>
            </div>
            <div class="soft-skills" *ngIf="resume.skills?.soft?.length">
              <h4>Soft Skills</h4>
              <div class="skill-tags">
                <span class="skill-tag" *ngFor="let skill of resume.skills?.soft">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="projects" *ngIf="resume.projects?.length">
        <div class="section-content">
          <h3>Featured Projects</h3>
          <div class="projects-grid">
            <div class="project-card" *ngFor="let project of resume.projects">
              <h4>{{ project.name }}</h4>
              <p class="description" [innerHTML]="formatText(project.description)"></p>
              <div class="technologies" *ngIf="project.technologies?.length">
                <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
              </div>
              <ul class="achievements" *ngIf="project.achievements?.length">
                <li *ngFor="let achievement of project.achievements">{{ achievement }}</li>
              </ul>
              <div class="project-links">
                <a *ngIf="project.link" [href]="formatUrl(project.link)" target="_blank" class="project-link">
                  <i class="bi bi-link-45deg"></i> View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="education" *ngIf="resume.education?.length">
        <div class="section-content">
          <h3>Education</h3>
          <div class="education-grid">
            <div class="education-card" *ngFor="let edu of resume.education">
              <h4>{{ edu.school }}</h4>
              <p class="degree">{{ edu.degree }} in {{ edu.field }}</p>
              <p class="date">
                {{ formatDate(edu.startDate) }} - 
                {{ edu.current ? 'Present' : formatDate(edu.endDate) }}
              </p>
              <p *ngIf="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
              <p *ngIf="edu.description" class="description" [innerHTML]="formatText(edu.description)"></p>
              <ul class="achievements" *ngIf="edu.achievements?.length">
                <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="experience" *ngIf="resume.workExperience?.length">
        <div class="section-content">
          <br>
          <h3>Work Experience</h3>
          <div class="timeline">
            <div class="timeline-item" *ngFor="let exp of resume.workExperience">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>{{ exp.title }}</h4>
                <div class="company-info">
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
        </div>
      </section>

      <!-- Certifications Section -->
      <section class="certifications" *ngIf="resume.certifications?.length">
        <div class="section-content">
          <h3>Certifications</h3>
          <div class="certifications-grid">
            <div class="certification-card" *ngFor="let cert of resume.certifications">
              <h4>{{ cert.name }}</h4>
              <p class="organization">{{ cert.organization }}</p>
              <p class="date">
                Issued: {{ formatDate(cert.issueDate) }}
                <span *ngIf="cert.expiryDate"> | Expires: {{ formatDate(cert.expiryDate) }}</span>
              </p>
              <p *ngIf="cert.description" class="description" [innerHTML]="formatText(cert.description)"></p>
              <p *ngIf="cert.credentialId" class="credential">
                Credential ID: 
                <a *ngIf="cert.credentialUrl" [href]="formatUrl(cert.credentialUrl)" target="_blank">
                  {{ cert.credentialId }}
                </a>
                <span *ngIf="!cert.credentialUrl">{{ cert.credentialId }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .creative-portfolio {
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
      border-bottom: 1px solid #3498db;
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

    .social-link {
      color: #34495e;
      text-decoration: none;
      
      i {
        color: #3498db;
        font-size: 0.7rem;
      }

      &:hover {
        color: #3498db;
      }
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
      gap: 0.15rem;
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
      margin-bottom: 0.25rem;
      padding-bottom: 0.1rem;

      h3 {
        color: #2c3e50;
        font-size: 0.8rem;
        margin: 0 0 0.15rem 0;
        padding-bottom: 0.1rem;
        border-bottom: 1px solid #3498db;
        line-height: 1;
        font-weight: 600;
      }
    }

    .section-content {
      padding: 0;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.15rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.15rem;
    }

    .education-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.15rem;
    }

    .education-card {
      padding: 0.15rem;
      background: #f8f9fa;
      border-radius: 3px;
      margin-bottom: 0.15rem;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.75rem;
        line-height: 1.1;
        font-weight: 600;
      }

      .degree {
        font-size: 0.7rem;
        margin: 0.05rem 0;
        line-height: 1.1;
        color: #7f8c8d;
      }

      .date {
        font-size: 0.65rem;
        color: #95a5a6;
        margin: 0.05rem 0;
        line-height: 1;
      }

      .description {
        margin: 0.05rem 0;
      }

      .achievements {
        margin: 0.05rem 0;
        padding-left: 0.4rem;
      }
    }

    .skill-tag, .tech-tag {
      display: inline-block;
      padding: 0.1rem 0.25rem;
      margin: 0.05rem;
      background: #ecf0f1;
      border-radius: 4px;
      font-size: 0.65rem;
      color: #2c3e50;
      line-height: 1;
    }

    .project-card, .certification-card {
      padding: 0.25rem;
      background: #f8f9fa;
      border-radius: 3px;
      margin-bottom: 0.15rem;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.75rem;
        line-height: 1.1;
        font-weight: 600;
      }

      p {
        font-size: 0.7rem;
        margin: 0.1rem 0;
        line-height: 1.1;
      }
    }

    .timeline {
      position: relative;
      padding-left: 0.4rem;
      border-left: 1px solid #3498db;
    }

    .timeline-item {
      position: relative;
      padding-bottom: 0.25rem;

      &:before {
        content: '';
        position: absolute;
        left: -3px;
        top: 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #3498db;
      }

      &:last-child {
        margin-bottom: 0.1rem;
      }
    }

    .timeline-content {
      background: #f8f9fa;
      padding: 0.25rem;
      border-radius: 3px;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.75rem;
        line-height: 1.1;
        font-weight: 600;
      }
    }

    .achievements {
      margin: 0.1rem 0;
      padding-left: 0.5rem;

      li {
        font-size: 0.7rem;
        line-height: 1.1;
        margin-bottom: 0.05rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .company-info {
      margin: 0.1rem 0;
      line-height: 1;
    }

    .company {
      color: #7f8c8d;
      font-size: 0.7rem;
      display: inline;
      margin-left: 0.2rem;
    }

    .date {
      color: #95a5a6;
      font-size: 0.65rem;
      display: block;
      margin-top: 0.05rem;
    }

    .description {
      font-size: 0.7rem;
      line-height: 1.1;
      margin: 0.1rem 0;
      color: #444;
    }

    .project-links {
      margin-top: 0.15rem;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 0.1rem;
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.7rem;

      &:hover {
        text-decoration: underline;
      }
    }

    .experience {
      margin-top: 0.6rem !important;
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

      .section-content {
        break-inside: avoid !important;
      }

      .timeline-item {
        break-inside: avoid !important;
      }

      .project-card, .education-card, .certification-card {
        break-inside: avoid !important;
      }

      .experience-item {
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

      .creative-portfolio {
        padding: 1.2rem 0.2rem 0.2rem 0.2rem !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
        font-family: Arial, sans-serif !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        max-width: 100%;
        margin: 0;
        color: #000000 !important;
      }

      * {
        text-rendering: geometricPrecision !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        print-color-adjust: exact !important;
      }

      .hero {
        margin-bottom: 0.4rem !important;
        padding-bottom: 0.2rem !important;
        border-bottom: 1px solid #000000 !important;
        text-align: center !important;
      }

      .name {
        font-size: 1.2rem !important;
        font-weight: 600 !important;
        color: #000000 !important;
        margin-right: 0.5rem !important;
        line-height: 1.2 !important;
      }

      .title {
        font-size: 0.85rem !important;
        color: #000000 !important;
        font-weight: normal !important;
        line-height: 1.2 !important;
      }

      .social-links {
        margin-top: 0.25rem !important;
        gap: 0.5rem !important;
      }

      .social-link {
        color: #000000 !important;
        font-size: 0.7rem !important;
        i {
          color: #000000 !important;
        }
      }

      .contact-info {
        margin-bottom: 0.4rem !important;
        padding: 0.25rem !important;
        border-bottom: none !important;
        
        * {
          color: #000000 !important;
        }
        
        a {
          text-decoration: none !important;
        }

        i {
          color: #000000 !important;
        }
      }

      .section-content {
        padding: 0 !important;
      }

      h3 {
        font-size: 0.8rem !important;
        color: #000000 !important;
        margin: 0 0 0.15rem 0 !important;
        padding-bottom: 0.1rem !important;
        border-bottom: 1px solid #000000 !important;
        font-weight: 600 !important;
      }

      h4 {
        color: #000000 !important;
        font-size: 0.75rem !important;
        font-weight: 600 !important;
      }

      .description, .achievements li {
        color: #000000 !important;
        margin: 0.1rem 0 !important;
        font-size: 0.7rem !important;
      }

      p {
        color: #000000 !important;
        font-size: 0.7rem !important;
        line-height: 1.2 !important;
        margin: 0.1rem 0 !important;
      }

      .tech-tag, .skill-tag {
        background: none !important;
        border: 1px solid #000000 !important;
        color: #000000 !important;
        padding: 0.08rem 0.25rem !important;
        margin: 0.08rem !important;
        font-size: 0.65rem !important;
      }

      .project-card, .certification-card, .timeline-content {
        border: 1px solid #000000 !important;
        background: none !important;
        page-break-inside: avoid !important;
        margin-bottom: 0.25rem !important;
        padding: 0.2rem !important;
      }

      .project-link {
        color: #000000 !important;
        text-decoration: none !important;
        font-weight: normal !important;
      }

      .timeline {
        position: relative !important;
        padding-left: 0.4rem !important;
        border-left: 1px solid #000000 !important;
      }

      .timeline-item {
        position: relative !important;
        padding-bottom: 0.25rem !important;
        page-break-inside: avoid !important;

        &:before {
          content: '' !important;
          position: absolute !important;
          left: -3px !important;
          top: 0 !important;
          width: 4px !important;
          height: 4px !important;
          border-radius: 50% !important;
          background: #000000 !important;
        }
      }

      .achievements {
        margin: 0.1rem 0 !important;
        padding-left: 0.5rem !important;
        list-style-type: none !important;

        li {
          position: relative !important;
          
          &:before {
            content: "•" !important;
            position: absolute !important;
            left: -0.5rem !important;
            color: #000000 !important;
          }
        }
      }

      .company {
        font-size: 0.7rem !important;
        color: #000000 !important;
        margin-left: 0.2rem !important;
      }

      .date {
        font-size: 0.65rem !important;
        color: #000000 !important;
        margin-top: 0.05rem !important;
      }

      .projects-grid, .certifications-grid {
        display: grid !important;
        gap: 0.25rem !important;
      }

      .skills-grid {
        display: grid !important;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
        gap: 0.25rem !important;
      }

      .experience {
        margin-top: 0.6rem !important;
      }

      .education-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 0.15rem !important;
      }

      .education-card {
        padding: 0.15rem !important;
        margin-bottom: 0.15rem !important;
      }

      .education {
        padding-top: 0.6rem !important;
      }
    }
  `]
})
export class CreativePortfolioComponent {
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