import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClassViewComponent } from './generic-components/class-view/class-view.component';
import { FunctionViewComponent } from './generic-components/function-view/function-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClassViewComponent,
    FunctionViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
