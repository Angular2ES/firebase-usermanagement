import { Component } from '@angular/core';
import { LoginComponent } from './login-email-password/email-password-login.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

@Component({
  selector: 'app-test-login',
  templateUrl: './login-email-password/login.component.html',
  styleUrls: ['./login-email-password/login.component.css'],
})

export class LoginTestComponent extends LoginComponent {
}

