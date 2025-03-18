import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-minimal-clean',
  templateUrl: './minimal-clean.component.html',
  styleUrls: ['./minimal-clean.component.scss']
})
export class MinimalCleanComponent {
  @Input() resume!: Resume;
} 