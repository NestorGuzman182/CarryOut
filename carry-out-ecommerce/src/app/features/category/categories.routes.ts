import { Routes } from "@angular/router";


export const routes: Routes = [
    {
      path: ':id',
      loadComponent: () => import('../category/pages/category.component')
    }
]
