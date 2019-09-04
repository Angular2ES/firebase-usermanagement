import { Component, ErrorHandler } from '@angular/core';
import { LoginHelper } from '../login-helper.service';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login-google',
  template: ``,
})
export class LoginGoogleComponent{

  authService: AuthenticationService;
  googleProvider: auth.GoogleAuthProvider;

  constructor(loginHelper: LoginHelper, private router: Router) { 
    this.authService = loginHelper.getAuthService();

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
    if (result.credential) {
      // This gives you a Google Access Token.
      var token = result.credential.providerId;
    }
    
    //Check if we have a user redirect after
    var user = result.user;
    if (user) {
      this.router.navigate(['/home']);
    }
    return result;
  }

  private errorHandler(error: any): void {
    console.log(error.code, error.message)
  }

}
