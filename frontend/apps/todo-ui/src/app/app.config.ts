import { ApiFetchClient } from '@ama-sdk/client-fetch';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApiManager, provideApiManager } from '@o3r/apis-manager';
import { provideTanStackQuery } from '@tanstack/angular-query-experimental';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';

const apiFetchClient = new ApiFetchClient({ basePath: 'http://localhost:8080' });
const apiManager = new ApiManager(apiFetchClient);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideApiManager(apiManager),
    provideTanStackQuery(new QueryClient()),
    provideStore()
  ]
};
