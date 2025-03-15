import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor',
    pathMatch: 'full'
  },
  {
    path: 'editor',
    loadChildren: () => import('./pages/editor/editor.module').then(m => m.EditorModule)
  },
  {
    path: 'preview',
    loadChildren: () => import('./pages/preview/preview.module').then(m => m.PreviewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
