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

  getUid(): Observable<string> {
    return this.getAuthState().pipe(map((user) => user ? user.uid : null));
  }

  async sendChangePasswordLink(email: string): Promise<void>{
    // after user changed password he/she will be logged in again
    // if you don't want this log the user out
    const url = { url : this.config.loginRedirectUrl }
    return this.angularFireAuth.auth.sendPasswordResetEmail(email, url) 
    .then(() => console.log('email send')) //TODO show alert of send email
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
