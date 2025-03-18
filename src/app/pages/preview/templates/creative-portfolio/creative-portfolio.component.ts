import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-creative-portfolio',
  templateUrl: './creative-portfolio.component.html',
  styleUrls: ['./creative-portfolio.component.scss']
})
export class CreativePortfolioComponent {
  @Input() resume!: Resume;

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

  private hasSkills(skills: Resume['skills']): boolean {
    return !!(
      skills?.programming_languages?.length ||
      skills?.frameworks_platforms?.length ||
      skills?.cloud_infrastructure?.length ||
      skills?.databases?.length ||
      skills?.methodologies_practices?.length
    );
  }
} 