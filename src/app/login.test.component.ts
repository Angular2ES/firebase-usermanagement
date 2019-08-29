import { Component } from '@angular/core';
import { LoginComponent } from './email-pass-login/login.component';

@Component({
  selector: 'app-test-login',
  templateUrl: './email-pass-login/login.component.html',
  styleUrls: ['./email-pass-login/login.component.css'],
})

export class LoginTestComponent extends LoginComponent {
}

