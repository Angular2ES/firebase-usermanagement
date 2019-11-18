import { InjectionToken } from '@angular/core';

// This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
export const InputValidationToken = new InjectionToken<IInputValidation>('InputValidationToken');
// This is an intermediate token containing only user-provided configuration
export const UserProvidedValidationToken = new InjectionToken<IInputValidation>('UserProvidedValidationToken');

export interface IInputValidation {
  required?: string;
  email?: string;
  verifyPassword?: string;
}

export const defaultInputValidation: IInputValidation = {
  required: 'Required',
  email: 'Invalid email address',
  verifyPassword: 'verify password',
}

// Merge default config with user provided config.
export function ngInputValidationFactory(userProvidedData: IInputValidation): IInputValidation {
  return Object.assign({}, defaultInputValidation, userProvidedData);
}