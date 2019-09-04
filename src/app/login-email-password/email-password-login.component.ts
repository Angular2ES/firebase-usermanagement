import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { LoginHelper } from '../login-helper.service';

@Component({
  selector: 'app-login',
  template: ``, 
})

export class LoginComponent {

  authService: AuthenticationService;
  userService: UserService;

  constructor(db: AngularFirestore, private loginHelper: LoginHelper, private router: Router) {
    this.authService = loginHelper.getAuthService();
    this.userService = loginHelper.getUserService();
  }

  // Login user with email and password
  public async loginWithEmailPassword(email: string, password: string): Promise<void> {
    try{
      await this.authService.loginWithEmailAndPassword('test@123.nl', '123123');
      this.router.navigate(['/home']);
    } catch (e){
        alert(e.message);
    }
  }
}

