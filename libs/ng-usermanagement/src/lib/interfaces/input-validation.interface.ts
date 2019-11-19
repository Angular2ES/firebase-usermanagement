import { InjectionToken } from '@angular/core';

// This token is the official token containing the final configuration; ie. the merge between default and user provided configurations
export const InputValidationToken = new InjectionToken<inputValidation>('InputValidationToken');
// This is an intermediate token containing only user-provided configuration
export const UserProvidedValidationToken = new InjectionToken<inputValidation>('UserProvidedValidationToken');

export interface inputValidation {
  required?: string;
  email?: string;
  verifyPassword?: string;
}

export const defaultInputValidation: inputValidation = {
  required: 'Required',
  email: 'Invalid email address',
  verifyPassword: 'verify password',
}

// Merge default config with user provided config.
export function ngInputValidationFactory(userProvidedData: inputValidation): inputValidation {
  return Object.assign({}, defaultInputValidation, userProvidedData);
}