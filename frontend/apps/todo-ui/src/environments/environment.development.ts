import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const environment = {
  production: false,
};

export const additionalModules = [
  StoreDevtoolsModule.instrument()
];
