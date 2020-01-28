import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSnackBarToken, SnackBarInterface } from '../interfaces/snackbar-config.interface';
import { UserModel } from '../models/user.model';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    private authService: AuthenticationService,
    private db: AngularFirestore,
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface
    )
  {}

  /**
   * Login as an other user
   * @param uid the user being impersonated
   * @param adminUid the admin/user impersonating used to login again
   */
  async impersonateUser(uid: string, adminUid: string): Promise<auth.UserCredential | void> {
    try {
      const createUserToken = firebase.functions().httpsCallable('createUserToken');
      const userToken = await createUserToken({uid: uid})
      const adminToken = await createUserToken({uid: adminUid})

      return this.authService.loginWithCustomToken(userToken.data.customUserToken, adminToken.data.customUserToken)
    } catch(err) {
      this.errorHandler(err)
    }
  }

  /**
   * Update the firestore database
   * @param uid user id
   * @param data given data to update
   */
  async updateUserSettings(uid: string, data: Object): Promise<string> {
    try {
      const updateUserData = firebase.functions().httpsCallable('updateUserData');
      const update = await updateUserData({uid: uid, ...data});
      return update.data.message
    } catch (err) {
      this.errorHandler(err);
    }
  }

  /**
   * Get all of the users within the users collection
   */
  get allUsers(): Observable<UserModel[]>  {
    return this.db.collection('users').valueChanges().pipe(
      map(users => {
        let userList: UserModel[] = [];
        users.forEach(user => {
          userList.push(user as UserModel);
        });
        return userList;
      })
    );
  }
  
  /**
   * Show a snackbar of the error
   * @param {any} error - An error Object with an message
   */
  private errorHandler(error: any): void {
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}