import { Component } from '@angular/core';

@Component({
  selector: 'ng-login-register-template',
  template: `
  <mat-tab-group class="custom-tab-style">
    <mat-tab label="Login">
      <ng-login-email-password></ng-login-email-password>
      <ng-login-google></ng-login-google>
    </mat-tab>
    <mat-tab label="Register">
      <ng-register></ng-register>
    </mat-tab>
  </mat-tab-group>
  `,
  styleUrls: ['../templates/login-register.temp.css']
})
export class LoginRegisterComponent {
}