import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { InterceptorAutenticacion } from './interceptors/auth.interceptor';
import { CustomPreloadingStrategy } from './strategies/custom-preloading.strategy';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAutenticacion,
      multi: true
    }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
