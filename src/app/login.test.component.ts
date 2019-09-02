import { Component } from '@angular/core';
import { LoginComponent } from './login-components/email-password-login.component';
import { LoginEmailComponent } from './login-email/login-email.component';

@Component({
  selector: 'app-test-login',
  // templateUrl: './login-components/login.component.html',
  // styleUrls: ['./login-components/login.component.css'],
  templateUrl: './login-email/login-email.component.html',
  styleUrls: ['./login-email/login-email.component.css'],
})

export class LoginTestComponent extends LoginEmailComponent {
}

