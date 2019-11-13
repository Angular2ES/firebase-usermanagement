import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs';
import { UserModuleConfig } from '../users-module-config';
import { map } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class AuthenticationService {
  
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private config: UserModuleConfig, toasterService: ToasterService) {
  }

  getAuthState(): Observable<User> {
    return this.angularFireAuth.authState;
  }

  getAngularFireAuth(): AngularFireAuth {
    return this.angularFireAuth;
  }

  getUid(): Observable<string> {
    return this.getAuthState().pipe(map((user) => user ? user.uid : null));
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential | void>{
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async sendLoginEmail(email: string): Promise<any>{
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: this.config.loginRedirectUrl,
      // This must be true.
      handleCodeInApp: true,
    };
    // check if we can login with only the email
    // if true we send an email to this user
    return this.angularFireAuth.auth.fetchSignInMethodsForEmail(email)
      .then(methods => {
        if(methods.includes('emailLink') || methods.includes('password')) {
          return this.angularFireAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(noResult => console.log('send email', noResult))
            .catch(err => console.error('send email error', err))
        } else {
          return Promise.reject('User not found or not valid');
        }
      });
  }

  async loginWithEmail(email: string, url: string): Promise<auth.UserCredential | void>{
    if (this.angularFireAuth.auth.isSignInWithEmailLink(url)) {
      return await this.angularFireAuth.auth.signInWithEmailLink(email, url)
    } else { console.log('Signin link is incorrect')}
  }

  async createAccount(email: string): Promise<auth.UserCredential>{
    const password = Math.random().toString(36).substring(7);
    // User will be loged in after succesfull creation
    // so we log out and ask the user to change password with an email
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => this.sendChangePasswordLink(email).then(() => userCredentials))
    }

  async sendChangePasswordLink(email: string): Promise<void>{
    // after user changed password he/she will be logged in again
    // if you don't want this log the user out
    const url = { url : this.config.loginRedirectUrl }
    return this.angularFireAuth.auth.sendPasswordResetEmail(email, url) 
    .then(() => console.log('email send')) //TODO show alert of send email
  }

  async sendVerifyEmailLink(user: User): Promise<void> {
    return user.sendEmailVerification()
    .then(() => console.log(`email send to ${user.email}`)) //TODO show alert of send email
  }

  async deleteAccount(): Promise<void> {
    return await this.angularFireAuth.auth.currentUser.delete()
    .then((result) => this.router.navigate([this.config.redirectAfterLogout]).then(() => result))
    .catch(e => console.log(e))
  }

  async logout(): Promise<void> {
    return await this.angularFireAuth.auth.signOut()
    .then((result) => this.router.navigate([this.config.redirectAfterLogout]).then(() => result))
    .catch(e => console.log(e))
  }
}
