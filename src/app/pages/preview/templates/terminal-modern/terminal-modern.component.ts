import { Component, Input } from '@angular/core';
import { Resume, Skills } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-terminal-modern',
  templateUrl: './terminal-modern.component.html',
  styleUrls: ['./terminal-modern.component.scss']
})
export class TerminalModernComponent {
  @Input() resume!: Resume;

  getSkillCategories(): string[] {
    return Object.keys(this.resume?.skills || {});
  }

  formatCategoryName(category: string): string {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  calculateDuration(startDate: string | undefined, endDate: string | undefined): string {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let duration = '';
    if (years > 0) {
      duration += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0 || (years === 0 && months === 0)) {
      if (duration) duration += ' ';
      duration += `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    return duration;
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  getSkills(category: string): string[] {
    return (this.resume?.skills as any)?.[category] || [];
  }
} 