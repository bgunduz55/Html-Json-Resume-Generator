import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { ModernProfessionalComponent } from './templates/modern-professional/modern-professional.component';
import { ClassicElegantComponent } from './templates/classic-elegant/classic-elegant.component';
import { CreativePortfolioComponent } from './templates/creative-portfolio/creative-portfolio.component';
import { ProfessionalSidebarComponent } from './templates/professional-sidebar/professional-sidebar.component';
import { AtsOptimizedComponent } from './templates/ats-optimized/ats-optimized.component';

@NgModule({
  declarations: [
    PreviewComponent,
    ModernProfessionalComponent,
    ClassicElegantComponent,
    CreativePortfolioComponent,
    ProfessionalSidebarComponent,
    AtsOptimizedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PreviewRoutingModule
  ]
})
export class PreviewModule { }
