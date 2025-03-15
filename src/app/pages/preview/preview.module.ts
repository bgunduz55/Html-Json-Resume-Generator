import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { ModernProfessionalComponent } from './templates/modern-professional/modern-professional.component';
import { ClassicElegantComponent } from './templates/classic-elegant/classic-elegant.component';
import { CreativePortfolioComponent } from './templates/creative-portfolio/creative-portfolio.component';

@NgModule({
  declarations: [
    PreviewComponent,
    ModernProfessionalComponent,
    ClassicElegantComponent,
    CreativePortfolioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PreviewRoutingModule
  ]
})
export class PreviewModule { }
