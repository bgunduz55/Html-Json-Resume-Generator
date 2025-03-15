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
            <a *ngIf="resume.personalInfo?.linkedin" [href]="resume.personalInfo?.linkedin" target="_blank" class="social-link">
              <i class="bi bi-linkedin"></i>
            </a>
            <a *ngIf="resume.personalInfo?.github" [href]="resume.personalInfo?.github" target="_blank" class="social-link">
              <i class="bi bi-github"></i>
            </a>
            <a *ngIf="resume.personalInfo?.website" [href]="resume.personalInfo?.website" target="_blank" class="social-link">
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
          <p>{{ resume.summary }}</p>
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
              <p class="description">{{ project.description }}</p>
              <div class="technologies" *ngIf="project.technologies?.length">
                <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
              </div>
              <ul class="achievements" *ngIf="project.achievements?.length">
                <li *ngFor="let achievement of project.achievements">{{ achievement }}</li>
              </ul>
              <div class="project-links">
                <a *ngIf="project.link" [href]="project.link" target="_blank" class="project-link">
                  <i class="bi bi-link-45deg"></i> View Project
                </a>
              </div>
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
                {{ edu.startDate | date:'MMM yyyy' }} - 
                {{ edu.current ? 'Present' : (edu.endDate | date:'MMM yyyy') }}
              </p>
              <p *ngIf="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</p>
              <p *ngIf="edu.description" class="description">{{ edu.description }}</p>
              <ul class="achievements" *ngIf="edu.achievements?.length">
                <li *ngFor="let achievement of edu.achievements">{{ achievement }}</li>
              </ul>
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
                Issued: {{ cert.issueDate }}
                <span *ngIf="cert.expiryDate"> | Expires: {{ cert.expiryDate }}</span>
              </p>
              <p *ngIf="cert.description" class="description">{{ cert.description }}</p>
              <p *ngIf="cert.credentialId" class="credential">
                Credential ID: 
                <a *ngIf="cert.credentialUrl" [href]="cert.credentialUrl" target="_blank">
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
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Poppins', sans-serif;
      color: #2c3e50;
      background: #ffffff;
    }

    .hero {
      background: linear-gradient(135deg, #6c5ce7, #a363d5);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .name {
      font-size: 3rem;
      margin: 0;
      font-weight: 700;
    }

    .title {
      font-size: 1.5rem;
      margin: 1rem 0;
      font-weight: 300;
      opacity: 0.9;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .social-link {
      color: white;
      font-size: 1.5rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }
    }

    .contact-info {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      margin-bottom: 2rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #2c3e50;

      i {
        color: #6c5ce7;
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
      margin-bottom: 3rem;
    }

    .section-content {
      padding: 0 2rem;
    }

    h3 {
      font-size: 2rem;
      color: #2c3e50;
      margin-bottom: 2rem;
      position: relative;
      padding-bottom: 0.5rem;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50px;
        height: 3px;
        background: #6c5ce7;
      }
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-tag {
      padding: 0.5rem 1rem;
      background: #f8f9fa;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #2c3e50;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        background: #6c5ce7;
        color: white;
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .project-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      h4 {
        color: #2c3e50;
        margin: 0 0 1rem 0;
      }
    }

    .timeline {
      position: relative;
      padding-left: 2rem;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 2px;
        background: #e9ecef;
      }
    }

    .timeline-item {
      position: relative;
      padding-bottom: 2rem;
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: #6c5ce7;
      border: 2px solid white;
    }

    .timeline-content {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
    }

    .education-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .education-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
    }

    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .certification-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
    }

    .tech-tag {
      display: inline-block;
      padding: 0.3rem 0.8rem;
      margin: 0.2rem;
      background: #e9ecef;
      border-radius: 15px;
      font-size: 0.8rem;
      color: #2c3e50;
    }

    .achievements {
      list-style-type: none;
      padding-left: 0;

      li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.5rem;

        &:before {
          content: '→';
          position: absolute;
          left: 0;
          color: #6c5ce7;
        }
      }
    }

    .project-links {
      margin-top: 1rem;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #6c5ce7;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: 3rem 1rem;
      }

      .name {
        font-size: 2.5rem;
      }

      .section-content {
        padding: 0 1rem;
      }

      .timeline {
        padding-left: 1.5rem;
      }

      .timeline-marker {
        left: -1.5rem;
      }
    }

    @media print {
      .hero {
        background: white !important;
        color: #2c3e50;
        padding: 2rem;
      }

      .social-link {
        color: #2c3e50;
      }

      section {
        break-inside: avoid;
      }
    }
  `]
})
export class CreativePortfolioComponent {
  @Input() resume: Resume | null = null;
} 