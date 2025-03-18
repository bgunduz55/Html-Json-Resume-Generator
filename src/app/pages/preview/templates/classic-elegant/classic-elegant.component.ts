import { Component, Input } from '@angular/core';
import { Resume } from '../../../../shared/models/resume.model';

@Component({
  selector: 'app-classic-elegant',
  templateUrl: './classic-elegant.component.html',
  styleUrls: ['./classic-elegant.component.scss']
})
export class ClassicElegantComponent {
  @Input() resume!: Resume;
} 