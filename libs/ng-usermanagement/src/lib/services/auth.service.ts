import { Inject, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { auth, User } from 'firebase';
import { ngUserManagementConfig, NgUserManagementConfigToken } from '../interfaces/firebase-config.interface';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private adminToken: string = '';
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    @Inject(NgUserManagementConfigToken) public config: ngUserManagementConfig) {
  }
  
  /**
   * Create a new account.
   * The user will not be logged in after creating an account
   * @param email 
   * @param password 
   * @param extraUserData
   * 
   * @usageNotes
   * Create a new account and add name to the database
   * ```
   * createAccount('email', 'password', { userName: 'Jan' })
   *  .then((userCredentials) => console.log('succesfull login'))
   * ```
   */
  async createAccount(email: string, password: string, extraUserData?: any): Promise<auth.UserCredential>{
    return await this.SecondaryApp.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => this.setExtraDataToUserCol(userCredentials, extraUserData))
    .then((userCredentials) => this.SecondaryApp.auth().signOut()
    .then(() => userCredentials)
    )
  }
    
  private setExtraDataToUserCol(userCredentials: auth.UserCredential, extraUserData?: any): auth.UserCredential {
    if (extraUserData != null) {
      this.SecondaryApp.firestore().collection('users').doc(userCredentials.user.uid).set(extraUserData, {merge: true})
      .catch((err) => alert(err))
    }
    return userCredentials;
  }
    
  /**
   * @param email
   * @param password
   */
  async loginWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential>{
    return await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  /**
   * Redirect user to the given provider
   * @param authProvider
   */
  async loginWithRedirect(authProvider: auth.AuthProvider): Promise<void> {
    return await this.angularFireAuth.auth.signInWithRedirect(authProvider);
  }
  
  /**
   * Returns the redirect result after redirecting the user
   */
  get RedirectResult(): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.getRedirectResult();
  }
  
  /**
   * Creates a popup for the given provider
   * @param authProvider 
   */
  async loginWithPopup(authProvider: auth.AuthProvider): Promise<auth.UserCredential> {
    return await this.angularFireAuth.auth.signInWithPopup(authProvider);
  }

  async loginWithCustomToken(uid: string, adminToken?: string): Promise<auth.UserCredential> {
    this.adminToken = adminToken ? adminToken : '';
    return await firebase.auth().signInWithCustomToken(uid)
  }

  async deleteAccount(): Promise<void> {
    return await this.angularFireAuth.auth.currentUser.delete()
  }

  async logout(): Promise<void> {
    return await this.angularFireAuth.auth.signOut()
      .then(() => {
        if (this.adminToken !== '') {
          this.loginWithCustomToken(this.adminToken)
          this.adminToken = '';
        }
      })
  }

  /**
   * Get an "secondary" App initialzized with the firebase configs
   */
  get SecondaryApp(): firebase.app.App {
    try {
      return firebase.app('secondary')
    }
    catch(error){
      return firebase.initializeApp(this.config.firebaseConfig, "secondary");
    }
  }
}
