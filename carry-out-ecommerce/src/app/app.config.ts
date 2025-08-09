import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  //PreloadAllModules,
  provideRouter,
  withPreloading
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { timeInterceptor } from './core/interceptors/time.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
//import { CustomPreloadService } from './core/services/custom-preload/custom-preload.service';
import { QuicklinkStrategy } from 'ngx-quicklink'
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(QuicklinkStrategy)),
    provideAnimations(),
    provideHttpClient(withInterceptors([
      timeInterceptor,
      tokenInterceptor
    ])),
  ]
};
