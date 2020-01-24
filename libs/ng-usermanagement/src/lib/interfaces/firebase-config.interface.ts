import { InjectionToken } from '@angular/core';

/**
 * This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
 */
export const NgUserManagementConfigToken = new InjectionToken<ngUserManagementConfig>('NgUserManagementConfigToken');

/**
 * This is an intermediate token containing only user-provided configuration
 */
export const UserProvidedConfigToken = new InjectionToken<ngUserManagementConfig>('UserProvidedConfigToken');

/**
 * An interface of the firebase configs
 */
export interface ngUserManagementConfig {
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

/**
 * default firebase configs
 */
export const defaultUserManagementConfig: ngUserManagementConfig = {
  firebaseConfig: {}
}

/**
 * Merge default config with user provided config.
 * @param userProvidedConfig 
 */
export function ngUserManagementConfigFactory(userProvidedConfig: ngUserManagementConfig): ngUserManagementConfig {
  return Object.assign({}, defaultUserManagementConfig, userProvidedConfig);
}