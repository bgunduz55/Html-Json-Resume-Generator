import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import { PreviewRoutingModule } from './preview-routing.module';
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
    PreviewRoutingModule
  ]
})
export class PreviewModule { }
