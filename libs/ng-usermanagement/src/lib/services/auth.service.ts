import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { auth, User } from 'firebase';
import { INgUserManagementConfig, NgUserManagementConfigToken } from '../interfaces/firebase-config.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private firebaseApp: firebase.app.App;
  
  constructor(
    // private angularFireAuth: AngularFireAuth,
    @Inject(NgUserManagementConfigToken) public config: INgUserManagementConfig
    ) {
  }

  async createAccount(email: string, password: string): Promise<auth.UserCredential>{
    // const password = Math.random().toString(36).substring(7);
    return await this.createInstanceOfAngularFireAuth().auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => this.sendChangePasswordLink(email).then(() => userCredentials))
      //TODO logout user from 
  }

  async sendChangePasswordLink(email: string): Promise<void>{
    // after user changed password he/she will be logged in again
    return this.createInstanceOfAngularFireAuth().auth().sendPasswordResetEmail(email) 
    .then(() => console.log('email send')) //TODO show alert of send email
  }

  async sendVerifyEmailLink(user: User): Promise<void> {
    return user.sendEmailVerification()
    .then(() => console.log(`email send to ${user.email}`)) //TODO show alert of send email
  }

  private createInstanceOfAngularFireAuth(): firebase.app.App {
    if(!this.firebaseApp) {
      console.log(this.config)
      this.firebaseApp = firebase.initializeApp(this.config.firebaseConfig, "secondary");
    }
    return this.firebaseApp;
  }
}
