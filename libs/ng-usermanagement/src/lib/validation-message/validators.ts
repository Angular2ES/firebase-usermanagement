import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const verifyPassword: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;
  if (!(pass === confirmPass)) {
      return { 'verifyPassword': true };
  }
  else return null;
}