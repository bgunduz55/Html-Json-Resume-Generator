import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-tech-modern',
  templateUrl: './tech-modern.component.html',
  styleUrls: ['./tech-modern.component.scss']
})
export class TechModernComponent {
  @Input() resume!: Resume;
} 