import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ResumeManagerComponent } from './components/resume-manager/resume-manager.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';

import { ResumeService } from './services/resume.service';
import { TemplateService } from './services/template.service';
import { PdfExportService } from './services/pdf-export.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResumeManagerComponent,
    TemplateSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ResumeService,
    TemplateService,
    PdfExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
