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

  getUid(): Observable<string> {
    return this.getAuthState().pipe(map((user) => user ? user.uid : null));
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    //try {
    await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
      //this.router.navigate(['/home']);
    //} catch (e) {
    //  alert("Error!" + e.message);
    //}
  }

  logout(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }

  getFirebaseApp(): FirebaseApp {
    if (!this.firebaseApp) {
      
      if (firebase.apps.length > 1) this.firebaseApp = firebase.app();
      else this.firebaseApp = firebase.initializeApp(this.config);
    }
    return this.firebaseApp;
  }
}
