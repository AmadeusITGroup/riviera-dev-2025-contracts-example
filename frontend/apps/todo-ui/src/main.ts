import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {ApplicationDevtoolsConsoleService, ApplicationDevtoolsMessageService} from '@o3r/application';
import {inject, runInInjectionContext} from '@angular/core';
import {
  ConfigurationDevtoolsMessageService,
  ConfigurationDevtoolsConsoleService,
  CustomConfig, ConfigurationBaseService
} from '@o3r/configuration';
import {ComponentsDevtoolsMessageService} from '@o3r/components';
import {
  LocalizationDevtoolsMessageService,
  LocalizationDevtoolsConsoleService,
  LocalizationService
} from '@o3r/localization';
import {Configuration} from '@o3r/core';

const loadDynamicConfig = async (configurationService: ConfigurationBaseService) => {
  await fetch('assets/config.json').then(async (result) => {
    if (result && result.ok) {
      const json = (await result.json()) as CustomConfig<Configuration>[];

      if (json && json.length && configurationService) {
        // Again, we use the configuration service to do all the work of handling the custom configuration.
        configurationService.computeConfiguration(json);
      }
    } else {
      console.warn('Failed to load Dynamic Config');
    }
  });
};

bootstrapApplication(AppComponent, appConfig)
  .then((m) => {
    runInInjectionContext(m.injector, () => {
      inject(LocalizationService).useLanguage('en-GB');
      inject(LocalizationDevtoolsConsoleService);
      inject(LocalizationDevtoolsMessageService);
      inject(ComponentsDevtoolsMessageService);
      inject(ConfigurationDevtoolsConsoleService);
      inject(ConfigurationDevtoolsMessageService);
      inject(ApplicationDevtoolsMessageService);
      inject(ApplicationDevtoolsConsoleService);
      void loadDynamicConfig(inject(ConfigurationBaseService));
    });

    return m;
  })
  .catch((err) => console.error(err));
