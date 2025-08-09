import { Routes } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { GridComponent } from "./pages/grid/grid.component";
import { TasksComponent } from "./pages/tasks/tasks.component";


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'grid',
        component: GridComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      }
    ]
  }
]
