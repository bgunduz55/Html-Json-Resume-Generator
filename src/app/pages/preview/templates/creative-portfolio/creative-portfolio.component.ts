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
      padding: 0.2rem;
      font-family: 'Poppins', sans-serif;
      color: #2c3e50;
      background: #ffffff;
      font-size: 0.7rem;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .hero {
      background: linear-gradient(135deg, #6c5ce7, #a363d5);
      color: white;
      padding: 0.3rem 0.2rem;
      text-align: center;
      margin-bottom: 0.15rem;
    }

    .name {
      font-size: 0.9rem;
      margin: 0;
      font-weight: 700;
      line-height: 1;
    }

    .title {
      font-size: 0.75rem;
      margin: 0.1rem 0;
      font-weight: 300;
      opacity: 0.9;
      line-height: 1;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 0.3rem;
      margin-top: 0.15rem;
    }

    .social-link {
      color: white;
      font-size: 0.8rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.3rem;
      padding: 0.15rem;
      background: #f8f9fa;
      margin-bottom: 0.15rem;
      font-size: 0.65rem;
      line-height: 1;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      color: #2c3e50;

      i {
        color: #6c5ce7;
        font-size: 0.7rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        
        &:hover {
          color: #6c5ce7;
        }
      }
    }

    section {
      margin-bottom: 0.15rem;
    }

    .section-content {
      padding: 0 0.15rem;
    }

    h3 {
      font-size: 0.75rem;
      color: #2c3e50;
      margin: 0 0 0.1rem 0;
      padding-bottom: 0.1rem;
      border-bottom: 1px solid #6c5ce7;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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

    .education-grid, .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.15rem;
    }

    .skill-tag, .tech-tag {
      display: inline-block;
      padding: 0.1rem 0.2rem;
      margin: 0.05rem;
      background: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 3px;
      font-size: 0.65rem;
      color: #2c3e50;
      line-height: 1;
    }

    .project-card, .education-card, .certification-card {
      background: #f8f9fa;
      padding: 0.15rem;
      border-radius: 3px;
      margin-bottom: 0.1rem;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.7rem;
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
      padding-left: 0.5rem;
    }

    .timeline-item {
      position: relative;
      padding-bottom: 0.15rem;
    }

    .timeline-marker {
      position: absolute;
      left: -0.5rem;
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background: #6c5ce7;
      border: 1px solid white;
    }

    .timeline-content {
      background: #f8f9fa;
      padding: 0.15rem;
      border-radius: 3px;

      h4 {
        color: #2c3e50;
        margin: 0;
        font-size: 0.7rem;
        line-height: 1.1;
        font-weight: 600;
      }
    }

    .achievements {
      margin: 0.1rem 0;
      padding-left: 0.3rem;
      list-style-type: none;

      li {
        font-size: 0.7rem;
        line-height: 1.1;
        margin-bottom: 0.05rem;
        position: relative;
        padding-left: 0.3rem;

        &:last-child {
          margin-bottom: 0;
        }

        &:before {
          content: "•";
          position: absolute;
          left: -0.15rem;
          color: #6c5ce7;
        }
      }
    }

    .company-info {
      margin: 0.1rem 0;
      line-height: 1;
    }

    .company {
      font-size: 0.7rem;
      color: #666;
      font-style: italic;
    }

    .date {
      font-size: 0.65rem;
      color: #999;
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
      margin-top: 0.1rem;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 0.1rem;
      color: #6c5ce7;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.7rem;

      &:hover {
        text-decoration: underline;
      }
    }

    @media print {
      @page {
        margin: 0.15cm !important;
        size: A4;
        marks: none;
      }

      .creative-portfolio {
        padding: 0.15rem !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        color-adjust: exact;
        font-family: 'Poppins', sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      * {
        text-rendering: geometricPrecision;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .hero {
        background: white !important;
        color: #2c3e50;
        padding: 0.15rem;
        margin-bottom: 0.1rem;
        border-bottom: 1px solid #000000;
      }

      .social-link {
        color: #2c3e50;
      }

      .contact-info {
        * {
          color: #000000 !important;
        }
        
        a {
          text-decoration: underline;
        }
      }

      .description, .achievements li {
        color: #000000 !important;
      }

      .tech-tag, .skill-tag {
        background: none !important;
        border: 1px solid #000000 !important;
        color: #000000 !important;
      }

      section h3 {
        border-bottom: 1px solid #000000 !important;
        color: #000000 !important;
      }

      .name, .title, .company, .date {
        color: #000000 !important;
      }

      .project-card, .education-card, .certification-card, .timeline-content {
        border: 1px solid #000000 !important;
        background: none !important;
      }

      .project-link {
        color: #000000 !important;
        text-decoration: underline;
      }

      .timeline-marker {
        background: #000000 !important;
        border-color: #000000 !important;
      }

      .achievements li:before {
        color: #000000 !important;
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