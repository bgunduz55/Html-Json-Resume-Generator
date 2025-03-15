import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../shared/models/resume.model';
import { Subscription } from 'rxjs';

type TemplateCategory = 'modern' | 'classic' | 'creative' | 'minimal';

interface TemplatePreview {
  id: string;
  name: string;
  preview: string;
  description: string;
}

@Component({
  selector: 'app-template-selector',
  template: `
    <div class="template-selector">
      <h2>Choose a Template</h2>
      <div class="templates-grid">
        <div
          *ngFor="let template of templates"
          class="template-card"
          [class.selected]="selectedTemplate === template.id"
          (click)="selectTemplate(template.id)"
        >
          <div class="preview-container">
            <img [src]="template.preview" [alt]="template.name" class="template-preview" />
          </div>
          <div class="template-info">
            <h3>{{ template.name }}</h3>
            <p>{{ template.description }}</p>
          </div>
          <button
            class="select-button"
            [class.selected]="selectedTemplate === template.id"
            (click)="selectTemplate(template.id)"
          >
            {{ selectedTemplate === template.id ? 'Selected' : 'Select' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .template-selector {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
      font-size: 2rem;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .template-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      background: white;
      cursor: pointer;
    }

    .template-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .template-card.selected {
      border: 2px solid #007bff;
      box-shadow: 0 5px 15px rgba(0,123,255,0.2);
    }

    .preview-container {
      width: 100%;
      height: 400px;
      overflow: hidden;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
    }

    .template-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.2s;
    }

    .template-card:hover .template-preview {
      transform: scale(1.05);
    }

    .template-info {
      padding: 1.5rem;
    }

    .template-info h3 {
      margin: 0;
      color: #333;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
    }

    .template-info p {
      margin: 0;
      color: #666;
      font-size: 1rem;
      line-height: 1.5;
    }

    .select-button {
      width: 100%;
      padding: 1rem;
      border: none;
      background: #007bff;
      color: white;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .select-button:hover {
      background: #0056b3;
    }

    .select-button.selected {
      background: #28a745;
    }

    @media (max-width: 768px) {
      .template-selector {
        padding: 1rem;
      }

      .preview-container {
        height: 300px;
      }

      .template-info h3 {
        font-size: 1.2rem;
      }

      .template-info p {
        font-size: 0.9rem;
      }
    }
  `]
})
export class TemplateSelectorComponent implements OnInit, OnDestroy {
  templates: TemplatePreview[] = [
    {
      id: 'modern',
      name: 'Modern Template',
      preview: 'assets/templates/modern-preview.svg',
      description: 'A clean and modern design with emphasis on readability and visual hierarchy.'
    },
    {
      id: 'professional',
      name: 'Professional Template',
      preview: 'assets/templates/professional-preview.svg',
      description: 'Traditional professional layout perfect for corporate environments.'
    },
    {
      id: 'creative',
      name: 'Creative Template',
      preview: 'assets/templates/creative-preview.svg',
      description: 'Stand out with this creative design featuring unique layout elements.'
    }
  ];

  selectedTemplate: string = 'modern';
  private subscription: Subscription;

  constructor(
    private templateService: TemplateService,
    private resumeService: ResumeService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    const currentTemplate = this.templateService.getCurrentTemplate();
    this.selectedTemplate = typeof currentTemplate === 'string' ? currentTemplate : currentTemplate.id;
    
    this.subscription.add(
      this.templateService.templateChange$.subscribe(template => {
        this.selectedTemplate = typeof template === 'string' ? template : template.id;
      })
    );

    this.subscription.add(
      this.resumeService.currentResume$.subscribe(resume => {
        if (resume) {
          this.updateAtsAnalysis(resume);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectTemplate(templateId: string): void {
    this.selectedTemplate = templateId;
    this.templateService.setTemplate(templateId);
  }

  private updateAtsAnalysis(resume: Resume): void {
    // Implementation of updateAtsAnalysis method
  }
} 