import { HttpInterceptorFn, HttpContext, HttpContextToken } from '@angular/common/http';
import { tap } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export const checkTime = (value: boolean) => {
    return new HttpContext().set(CHECK_TIME, value);
};

export const timeInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(CHECK_TIME)) {
    const start = performance.now();
    return next(req)
            .pipe(
              tap( () => {
                const time = (performance.now() - start) + 'ms';
                console.log(req.url, time);
              })
            );
  }
  return next(req)
};
