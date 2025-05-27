import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component')
      },
      {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth.component')
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/pages/products-page/products-page.component')
      },
      {
        path: 'category/:id',
        loadComponent: () => import('./features/category/pages/category.component')
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component')
      },
      {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found.component')
      }
    ]
  },

];
