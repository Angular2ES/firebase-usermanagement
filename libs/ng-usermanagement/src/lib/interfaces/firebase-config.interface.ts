import { InjectionToken } from '@angular/core';

// This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
export const NgUserManagementConfigToken = new InjectionToken<INgUserManagementConfig>('NgUserManagementConfigToken');
// This is an intermediate token containing only user-provided configuration
export const UserProvidedConfigToken = new InjectionToken<INgUserManagementConfig>('UserProvidedConfigToken');


export interface INgUserManagementConfig {
  authGuardFallbackURL?: string;
  authGuardLoggedInURL?: string;

  firebaseConfig?: any;
}

export const defaultUserManagementConfig: INgUserManagementConfig = {
  authGuardFallbackURL: '/',
  authGuardLoggedInURL: '/',

  firebaseConfig: {}
}

// Merge default config with user provided config.
export function ngUserManagementConfigFactory(userProvidedConfig: INgUserManagementConfig): INgUserManagementConfig {
  return Object.assign({}, defaultUserManagementConfig, userProvidedConfig);
}