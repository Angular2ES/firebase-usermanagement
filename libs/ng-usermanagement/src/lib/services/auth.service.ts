import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { auth, User } from 'firebase';
import { INgUserManagementConfig, NgUserManagementConfigToken } from '../interfaces/firebase-config.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private firebaseApp: firebase.app.App;
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    @Inject(NgUserManagementConfigToken) public config: INgUserManagementConfig) {
  }

  /**
   * Create a new account
   * The function createUserWithEmailAndPassword will log the user into the app
   * We do not want this so we create a new FirebaseApp
   * After succesfull creation of the user we log the user out of the secondary app
   * @param email 
   * @param password 
   */
  async createAccount(email: string, password: string, extraUserData?: any): Promise<auth.UserCredential>{
    return await this.getSecondaryApp().auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => this.setExtraDataToUserCol(userCredentials, extraUserData))
      .then((userCredentials) => this.getSecondaryApp().auth().signOut().then(() => userCredentials))
  }

  private setExtraDataToUserCol(userCredentials: auth.UserCredential, extraUserData?: any): auth.UserCredential {
    if (extraUserData != null) {
      this.getSecondaryApp().firestore().collection('users').doc(userCredentials.user.uid).set(extraUserData, {merge: true})
        .catch((err) => alert(err))
    }
    return userCredentials;
  }

  /**
   * @param user 
   */
  async sendChangePasswordLink(user: User): Promise<void>{
    // after user changed password he/she will be logged in again
    return this.angularFireAuth.auth.sendPasswordResetEmail(user.email) 
    .then(() => console.log(`email send to ${user.email}`)) //TODO show alert of send email
  }
  
  /**
   * @param user 
   */
  async sendVerifyEmailLink(user: User): Promise<void> {
    return user.sendEmailVerification()
    .then(() => console.log(`email send to ${user.email}`)) //TODO show alert of send email
  }

  private getSecondaryApp(): firebase.app.App {
    if(!this.firebaseApp) {
      this.firebaseApp = firebase.initializeApp(this.config.firebaseConfig, "secondary");
    }
    return this.firebaseApp;
  }
}
