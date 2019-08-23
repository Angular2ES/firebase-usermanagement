import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User, auth } from 'firebase';
import { Observable } from 'rxjs';
import { UserModuleConfig } from '../users-module-config';
import * as firebase from 'firebase';

@Injectable()
export class AuthenticationService implements CanActivate {
  authState$: Observable<User>;
  firebaseApp: firebase.app.App;
  uid$: Observable<string>;
  user: User;
  user$: Observable<User>;

  lists: Observable<any[]>;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private config: UserModuleConfig) {
    this.authState$ = angularFireAuth.authState;
  }

  canActivate() {
    return true;
  }

  getAuthState() {
    return this.authState$;
  }

  login() {
    return this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    console.log('click');
    try {
      await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  getUser() {
    return this.angularFireAuth.auth.currentUser;
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  getFirebaseApp() {
    if (!this.firebaseApp) {
      
      if (firebase.apps.length > 1) this.firebaseApp = firebase.app();
      else this.firebaseApp = firebase.initializeApp(this.config);
    }

    return this.firebaseApp;
  }
}
