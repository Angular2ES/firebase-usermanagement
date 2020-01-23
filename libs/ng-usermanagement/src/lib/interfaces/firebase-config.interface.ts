import { InjectionToken } from '@angular/core';

// This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
export const NgUserManagementConfigToken = new InjectionToken<ngUserManagementConfig>('NgUserManagementConfigToken');
// This is an intermediate token containing only user-provided configuration
export const UserProvidedConfigToken = new InjectionToken<ngUserManagementConfig>('UserProvidedConfigToken');

export interface ngUserManagementConfig {
  authGuardLoggedInURL?: string; // Fallback URL if user isn't logged into the app

  /**
   * @usageNotes
   * Firebase configurations
   * ```
   * example = {
   *  apiKey: "Key here",
   *  authDomain: "[projectId].firebaseapp.com",
   *  databaseURL: "https://[projectId].firebaseio.com",
   *  projectId: "[projectId]",
   *  storageBucket: "[projectId].appspot.com",
   *  messagingSenderId: "123",
   *  appId: "123"
   * }
   * ```
   */
  firebaseConfig?: any;
}

export const defaultUserManagementConfig: ngUserManagementConfig = {
  authGuardLoggedInURL: '/',

  firebaseConfig: {}
}

// Merge default config with user provided config.
export function ngUserManagementConfigFactory(userProvidedConfig: ngUserManagementConfig): ngUserManagementConfig {
  return Object.assign({}, defaultUserManagementConfig, userProvidedConfig);
}