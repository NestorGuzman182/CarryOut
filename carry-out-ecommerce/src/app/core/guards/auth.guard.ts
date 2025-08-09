import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = () => {

  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();

  if (!token) {
    router.navigate(['/auth'])
    return false;
  }

/*   return authService.profile$.pipe(
    map((user) => {
      console.log(user)
      console.log(token)
      if(!user && !token) {
        router.navigate(['/auth'])
        return false;
      }
      return true;
    })
  ) */

  return true;
};
