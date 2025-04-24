import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  const addToken = (req: HttpRequest<unknown>) => {
    const token = tokenService.getToken();
    if(token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return authReq;
    }
    return req;
  }

  req = addToken(req);

  return next(req);
};
