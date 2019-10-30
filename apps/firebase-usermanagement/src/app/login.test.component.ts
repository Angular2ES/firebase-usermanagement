import { Component } from '@angular/core';
import { LoginComponent } from './login-email-password/email-password-login.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

@Component({
  selector: 'app-test-login',
  template: `
  <div class="login-collection">
    <form>  
      <app-login-email-password></app-login-email-password>
      <app-login-google></app-login-google>
      <app-login-email></app-login-email>
      <app-create-account></app-create-account>
    </form>
  </div>
  `,
  styleUrls: ['./login-email-password/email-password-login.component.scss'],
})

export class LoginTestComponent {
} 