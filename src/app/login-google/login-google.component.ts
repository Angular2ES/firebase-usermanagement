import { Component, ErrorHandler } from '@angular/core';
import { LoginHelper } from '../login-helper.service';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { map, tap } from 'rxjs/operators';
import { UserService } from 'src/services/user.service';
import { UserModuleConfig } from 'src/users-module-config';

@Component({
  selector: 'app-login-google',
  template: ``,
})
export class LoginGoogleComponent{

  authService: AuthenticationService;
  userService: UserService;
  googleProvider: auth.GoogleAuthProvider;

  constructor(loginHelper: LoginHelper, private router: Router, private config: UserModuleConfig) { 
    this.authService = loginHelper.getAuthService();
    this.userService = loginHelper.getUserService();

    this.googleProvider = new auth.GoogleAuthProvider();
    this.googleProvider.addScope('profile');
    this.googleProvider.addScope('email');

    // Using a redirect.
    this.authService.getAngularFireAuth().auth.getRedirectResult().then((result) => {
      this.resultHandler(result);
    }).catch(error => this.errorHandler(error));
  }

  // Start a sign in process for an unauthenticated user.
  // with redirect to google login service
  signInWithRedirect(){
    this.authService.getAngularFireAuth().auth.signInWithRedirect(this.googleProvider).catch(error => this.errorHandler(error));
  }

  // Using a popup.
  signInWithPopup(){
  this.authService.getAngularFireAuth().auth.signInWithPopup(this.googleProvider).then((result) => {
    this.resultHandler(result);
  }).catch(error => this.errorHandler(error));
  }

  private resultHandler(result: auth.UserCredential): auth.UserCredential{
    //Check if we have a user redirect afterj
    if (result.user) {
      this.router.navigate([this.config.redirectAfterLogin]);
    }
    return result;
  }

  private errorHandler(error: any): void {
    console.log(error.code, error.message)
  }

}
