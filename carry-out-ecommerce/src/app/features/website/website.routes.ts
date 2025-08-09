import { Routes } from "@angular/router";
import { LayoutComponent } from "../../shared/layout/layout.component";
import { authGuard } from "../../core/guards/auth.guard";
import { exitGuard } from "../../core/guards/exit.guard";

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
        loadComponent: () => import('./home/home.component')
      },
      {
        path: 'auth',
        canDeactivate: [exitGuard],
        loadComponent: () => import('../../features/auth/auth.component')
      },
      {
        path: 'products',
        loadComponent: () => import('../../features/products/pages/products-page/products-page.component')
      },
      {
        path: 'category',
        loadChildren: () => import('../../features/category/categories.routes').then(m => m.routes),
        data: {
          preload: true
        }
      },
      {
        path: 'product/:id',
        loadComponent: () => import('../../features/products/pages/product-detail/product-detail.component')
      },
      {
        path: 'about',
        loadComponent: () => import('./about/about.component')
      },
      {
        path: 'profile',
        loadComponent: () => import('../auth/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      }
    ]
  }
]
