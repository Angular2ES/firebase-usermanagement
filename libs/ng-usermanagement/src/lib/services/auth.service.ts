import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { ngUserManagementConfig, NgUserManagementConfigToken } from '../interfaces/firebase-config.interface';

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
    try {
      const credentials = await this.secondaryApp.auth().createUserWithEmailAndPassword(email, password)
      if (credentials != null) {
        await this.setExtraDataToUserCol(credentials, extraUserData);
        await this.secondaryApp.auth().signOut();
      }
      return credentials;
    } catch(err){
      console.error(err)
    }
      
  }
    
  private setExtraDataToUserCol(userCredentials: auth.UserCredential, extraUserData?: any): Promise<void> {
    let userData = {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email
    }
    if (extraUserData != null) userData = { ...userData, ...extraUserData}
    return this.secondaryApp.firestore().collection('users').doc(userCredentials.user.uid).set(userData)
  }
    
  /**
   * @param email
   * @param password
   */
  async loginWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential>{
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  /**
   * Redirect user to the given provider
   * @param authProvider
   */
  async loginWithRedirect(authProvider: auth.AuthProvider): Promise<void> {
    return this.angularFireAuth.auth.signInWithRedirect(authProvider);
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
    return this.angularFireAuth.auth.signInWithPopup(authProvider);
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
  get secondaryApp(): firebase.app.App {
    try {
      return firebase.app('secondary')
    }
    catch(error){
      return firebase.initializeApp(this.config.firebaseConfig, "secondary");
    }
  }
}
