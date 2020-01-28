import { InjectionToken, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material';

// This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
export const NgSnackBarToken = new InjectionToken<SnackBarInterface>('NgSnackBarToken');
export const NgSnackBarToken2 = new InjectionToken<SnackBarInterface>('NgSnackBarToken');
// This is an intermediate token containing only user-provided configuration
export const UserProvidedSnackBarToken = new InjectionToken<SnackBarInterface>('UserProvidedSnackBarToken');

export interface SnackBarInterface {

  /**
   * open a snackbar message with extra configs
   */
  open(message: string, action?: string, config?: any): any;
}

// switch between default snackbar and a userprovided snackbar
export function ngSnackBarFactory(userProvidedSnackBar: SnackBarInterface, injector: Injector): SnackBarInterface {
  if (userProvidedSnackBar === undefined || userProvidedSnackBar === null) {
    return injector.get(MatSnackBar);
  } else {
    return userProvidedSnackBar;
  }
}