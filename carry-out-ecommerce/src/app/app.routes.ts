import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth.component')
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/pages/products-list/products-list.component')
      }
    ]
  },

];
