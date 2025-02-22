import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule, Plus, Clock, Calendar, Play, Trash, Linkedin, Github, Twitter } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';

import { provideHotToastConfig } from '@ngxpert/hot-toast';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      {
        eventCoalescing: true
      }
    ),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
      }),
    ),
    importProvidersFrom(LucideAngularModule.pick({ Plus, Clock, Calendar, Play, Trash, Linkedin, Github, Twitter })),
    provideHttpClient(),
    provideHotToastConfig(),
  ]
};
