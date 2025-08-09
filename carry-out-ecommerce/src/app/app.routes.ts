import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/website/website.routes').then(m => m.routes),
    data: {
      preload: true
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/cms/cms.routes').then(m => m.routes),

  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component')
  }
];
