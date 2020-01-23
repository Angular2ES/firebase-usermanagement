import { Component } from '@angular/core';

@Component({
  selector: 'app-test-login',
  template: `
  <ng-login-email-password></ng-login-email-password>
  <ng-login-google [authenticationFlowGoogle]="'redirect'"></ng-login-google>
  <ng-login-google></ng-login-google>
  `
})
export class LoginTestComponent {
  
} 
