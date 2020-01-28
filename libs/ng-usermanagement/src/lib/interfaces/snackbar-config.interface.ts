import { InjectionToken, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';

/**
 * This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
 */ 
export const NgSnackBarToken = new InjectionToken<SnackBarInterface>('NgSnackBarToken');

/**
 * This is an intermediate token containing only user-provided configuration
 */
export const UserProvidedSnackBarToken = new InjectionToken<SnackBarInterface>('UserProvidedSnackBarToken');

/**
 * An interface of a snackbar
 */
export interface SnackBarInterface {

  /**
   * open a snackbar message with extra configs
   */
  open(message: string, action?: string, config?: any): any;
}

/**
 * Switch between default snackbar and a userprovided snackbar
 * @param userProvidedSnackBar 
 * @param injector 
 */
export function ngSnackBarFactory(userProvidedSnackBar: SnackBarInterface, injector: Injector): SnackBarInterface {
  if (userProvidedSnackBar === undefined || userProvidedSnackBar === null) {
    return injector.get(MatSnackBar);
  } else {
    return userProvidedSnackBar;
  }
}