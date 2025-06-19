import {ApiFetchClient} from '@ama-sdk/client-fetch';
import {ApplicationConfig, provideZoneChangeDetection, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {ApiManager, provideApiManager} from '@o3r/apis-manager';
import {provideTanStackQuery} from '@tanstack/angular-query-experimental';
import {QueryClient} from '@tanstack/angular-query-experimental';
import {routes} from './app.routes';
import {provideStore, StoreModule, StoreRootModule} from '@ngrx/store';
import {TranslateCompiler, TranslateModule} from '@ngx-translate/core';
import {LocalizationDevtoolsModule, translateLoaderProvider} from '@o3r/localization';
import {TranslateMessageFormatLazyCompiler} from '@o3r/localization';
import {LocalizationConfiguration, LocalizationModule, MESSAGE_FORMAT_CONFIG} from '@o3r/localization';
import {registerLocaleData} from '@angular/common';
import localeEN from '@angular/common/locales/en';
import localeFR from '@angular/common/locales/fr';
import {environment} from '../environments/environment';
import {ConfigurationBaseServiceModule, OTTER_CONFIGURATION_DEVTOOLS_OPTIONS} from '@o3r/configuration';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

const apiFetchClient = new ApiFetchClient({basePath: 'http://localhost:8080'});
const apiManager = new ApiManager(apiFetchClient);
registerLocaleData(localeEN, 'en-GB');
registerLocaleData(localeFR, 'fr-FT');

export function localizationConfigurationFactory(): Partial<LocalizationConfiguration> {
  return {
    supportedLocales: ['en-GB', 'fr-FR'],
    fallbackLanguage: 'en-GB',
    bundlesOutputPath: 'localizations/',
    useDynamicContent: environment.production
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideApiManager(apiManager),
    provideTanStackQuery(new QueryClient()),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: translateLoaderProvider,
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatLazyCompiler
        }
      }),
      LocalizationModule.forRoot(localizationConfigurationFactory),
      LocalizationDevtoolsModule,
      EffectsModule.forRoot([]),
      StoreModule.forRoot({}),
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
      ConfigurationBaseServiceModule
    ]),
    {provide: MESSAGE_FORMAT_CONFIG, useValue: {}},
    {provide: OTTER_CONFIGURATION_DEVTOOLS_OPTIONS, useValue: {isActivatedOnBootstrap: true}}
  ]
};
