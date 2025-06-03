import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApplicationDevtoolsConsoleService, ApplicationDevtoolsMessageService } from '@o3r/application';
import { inject, runInInjectionContext } from '@angular/core';
import { ConfigurationDevtoolsMessageService, ConfigurationDevtoolsConsoleService } from '@o3r/configuration';

bootstrapApplication(AppComponent, appConfig)
  .then((m) => {
    runInInjectionContext(m.injector, () => {
      inject(ConfigurationDevtoolsConsoleService);
      inject(ConfigurationDevtoolsMessageService);
      inject(ApplicationDevtoolsMessageService);
      inject(ApplicationDevtoolsConsoleService);
    });
    return m;
  })
  .catch((err) => console.error(err));
