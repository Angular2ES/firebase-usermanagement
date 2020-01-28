import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { NgSnackBarToken, SnackBarInterface } from '../../../interfaces/snackbar-config.interface';
import { AuthenticationService } from '../../../services/auth.service';

export enum AuthenticationFlow {
  popup = 'popup',
  redirect = 'redirect',
}
@Component({
  selector: 'ng-login-google',
  templateUrl: '../login-google/login-google.component.html',
  styleUrls: ['../login-google/login-google.component.css'],
})
export class LoginGoogleComponent{

  /**
   * redirect the user or create a popup within the application.
   * options are: 'redirect' or 'popup'
   */
  @Input() authenticationFlowGoogle: AuthenticationFlow = AuthenticationFlow.popup;
  /**
   * redirect the user to another page
   */
  @Input() redirectOnSucces: string;
  
  /**
   * Emits the user credentials on a succesfull login
   */
  @Output() onSuccess: EventEmitter<auth.UserCredential> = new EventEmitter();
  /**
   * Emits the error message on a failed login
   */
  @Output() onFailed: EventEmitter<string> = new EventEmitter();

  private googleProvider: auth.GoogleAuthProvider;
  
  constructor(
    private authService: AuthenticationService,
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface,
    private router: Router
    ) {

    this.googleProvider = new auth.GoogleAuthProvider();
    this.googleProvider.addScope('profile');
    this.googleProvider.addScope('email');

    // Using a redirect.
    this.authService.RedirectResult.then((result) => {
      this.resultHandler(result);
    }).catch(error => this.errorHandler(error));
  }

  loginWithGoogle(){
    if (this.authenticationFlowGoogle === AuthenticationFlow.redirect) this.signInWithRedirect();
    else this.signInWithPopup()
  }

  // Start a sign in process for an unauthenticated user.
  // with redirect to google login service
  signInWithRedirect(){
    this.authService.loginWithRedirect(this.googleProvider)
    .catch(error => this.errorHandler(error));
  }

  // Using a popup.
  signInWithPopup(){
    this.authService.loginWithPopup(this.googleProvider)
    .then((Credential) => this.resultHandler(Credential))
    .catch(error => this.errorHandler(error));
  }

  private resultHandler(result: auth.UserCredential): auth.UserCredential{
    //Check if we have a user
    if (result.user) {
      this.snackBar.open('welcome', '', { duration: 2000 });
      this.onSuccess.next(result);

      if (this.redirectOnSucces != null) {
        this.router.navigate([this.redirectOnSucces])
      }
    }
    return result;
  }

  private errorHandler(error: any): void {
    this.onFailed.next(error.message);
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}
