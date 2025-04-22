import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StorageSync } from '@o3r/store-sync';
import { RuntimeChecks, StoreModule } from '@ngrx/store';
import { Serializer } from '@o3r/core';
import { environment, additionalModules } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { prefersReducedMotion } from '@o3r/application';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const localStorageStates: Record<string, Serializer<any>>[] = [/* Store to register in local storage */];
const storageSync = new StorageSync({
  keys: localStorageStates, rehydrate: true
});

const rootReducers = {

};

const metaReducers = [storageSync.localStorageSync()];
const runtimeChecks: Partial<RuntimeChecks> = {
  strictActionImmutability: false,
  strictActionSerializability: false,
  strictActionTypeUniqueness: !environment.production,
  strictActionWithinNgZone: !environment.production,
  strictStateImmutability: !environment.production,
  strictStateSerializability: false
};


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), importProvidersFrom(
EffectsModule.forRoot([])), importProvidersFrom(
StoreModule.forRoot(rootReducers, {metaReducers, runtimeChecks})), importProvidersFrom(
additionalModules), importProvidersFrom(
BrowserAnimationsModule.withConfig({disableAnimations: prefersReducedMotion()}))]
};

