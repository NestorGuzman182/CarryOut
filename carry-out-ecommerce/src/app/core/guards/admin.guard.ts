import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.profile$.pipe(
    map((profile) => {
      if(profile?.role === 'admin') {
        return true;
      } else {
        router.navigate(['/profile'])
        return false
      }
    }
  )
  )

};
