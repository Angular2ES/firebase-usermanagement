import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs';
import { UserModuleConfig } from '../users-module-config';
import * as firebase from 'firebase';
import { FirebaseApp } from '@angular/fire';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService implements CanActivate {
  private authState$: Observable<User>;
  private firebaseApp: firebase.app.App;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private config: UserModuleConfig) {
  }

  //TODO create a guard or a new guardService
  canActivate(): boolean {
    return true;
  }

  getAuthState(): Observable<User> {
    return this.angularFireAuth.authState;;
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
    } else { console.log('Sign link is incorrect')}
  }

  async loginWithToken(token: string): Promise<auth.UserCredential | void> {
    return await this.angularFireAuth.auth.signInWithCustomToken(token);
  }

  async createAccount(email: string): Promise<auth.UserCredential>{
    // TODO create random password
    const password = 'password'
    // User will be loged in after succesfull creation if we want this we need to direct user to home
    return await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);

  }

  async logout(): Promise<void> {
    return await this.angularFireAuth.auth.signOut();
  }

  // getFirebaseApp(): FirebaseApp {
  //   if (!this.firebaseApp) {
      
  //     if (firebase.apps.length > 1) this.firebaseApp = firebase.app();
  //     else this.firebaseApp = firebase.initializeApp(this.config);
  //   }
  //   return this.firebaseApp;
  // }
}
