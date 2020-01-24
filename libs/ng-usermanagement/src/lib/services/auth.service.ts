import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { ngUserManagementConfig, NgUserManagementConfigToken } from '../interfaces/firebase-config.interface';
import { AdminPopupService } from '../settings/admin/admin-popup/admin-popup.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private adminToken: string = '';
  
  constructor(
    private angularFireAuth: AngularFireAuth,
    private adminPopup: AdminPopupService,
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
        let userData = {
          uid: credentials.user.uid,
          email: credentials.user.email
        }
        if (extraUserData != null) userData = { ...userData, ...extraUserData}

        await this.secondaryApp.firestore().collection('users').doc(credentials.user.uid).set(userData)
        await this.secondaryApp.auth().signOut();
      }
      return credentials;
    } catch(err){
      console.error(err)
    }
  }
    
  /**
   * @param email
   * @param password
   */
  public loginWithEmailAndPassword(email: string, password: string): Promise<auth.UserCredential>{
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  /**
   * Redirect user to the given provider
   * @param authProvider
   */
  public loginWithRedirect(authProvider: auth.AuthProvider): Promise<void> {
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
  public loginWithPopup(authProvider: auth.AuthProvider): Promise<auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithPopup(authProvider);
  }

  public loginWithCustomToken(uid: string, adminToken?: string): Promise<auth.UserCredential> {
    this.adminToken = adminToken ? adminToken : '';
    return firebase.auth().signInWithCustomToken(uid)
  }


  async logout(): Promise<void> {
    return await this.angularFireAuth.auth.signOut()
      .then(() => {
        if (this.adminToken !== '') {
          this.adminPopup.close();
          this.loginWithCustomToken(this.adminToken)
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
