import { Component } from '@angular/core';
import { LoginComponent } from './login-components/email-password-login.component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

@Component({
  selector: 'app-test-login',
  templateUrl: './login-google/login-google.component.html',
  styleUrls: ['./login-google/login-google.component.css'],
})

export class LoginTestComponent extends LoginGoogleComponent {
}

