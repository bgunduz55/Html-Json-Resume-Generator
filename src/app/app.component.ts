import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      margin-top: 64px;
      min-height: calc(100vh - 64px);
      background-color: #f8f9fa;
      padding: 2rem 1rem;
    }
  `]
})
export class AppComponent {
  title = 'Html-Json-Resume-Generator';
}
