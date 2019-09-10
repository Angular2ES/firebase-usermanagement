import { Component } from '@angular/core';
import { LoginComponent } from './login-email-password/email-password-login.component';
import { LoginGoogleComponent } from './login-google/login-google.component';

@Component({
  selector: 'app-test-login',
  templateUrl: './login-google/login-google.component.html',
  styleUrls: ['./login-google/login-google.component.css'],
})

export class LoginTestComponent extends LoginGoogleComponent {
} 