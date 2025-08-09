import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const exitGuard: CanDeactivateFn<OnExit> = (component) => {
  console.log('Entre al guardian !!', component)
  return component.onExit ? component.onExit() : true;
};
