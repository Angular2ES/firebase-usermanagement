import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay, tap, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly user$: Observable<any>;
  private userCollection: AngularFirestoreCollection = this.db.collection('users');
  
  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth) {
      
    this.user$ = this.firebaseUser.pipe(
      switchMap((fbUser) => fbUser ? this.userCollection.doc(fbUser.uid).valueChanges() : new Observable<any>()),
      shareReplay(1)
      );
  }

/**
 * Get the firebase user that is current logged in
 */
  get firebaseUser(): Observable<User | null> {
    return this.angularFireAuth.authState;
  }
  
  /**
   * @param uid 
   * @param userData 
   */ 
  public async updateUser(uid: string, userData): Promise<void> {
    return this.userCollection.doc(uid).update(userData);
  }

  /**
   * Get current user that is logged in
   */
  get currentUser(): Observable<any> {
    return this.user$;
  }

  /**
   * Get user data with Id
   * @param userId 
   */
  public getUserWithId(uid: string): Observable<any> {
    return this.userCollection.doc(uid).valueChanges().pipe(
      map(user => user),
      shareReplay(1)
    )
  }

  async sendChangePasswordLink(email: string): Promise<void>{
    // after user changed password he/she will be logged in again
    // if you don't want this log the user out
    // const url = { url : this.config.loginRedirectUrl }
    return this.angularFireAuth.auth.sendPasswordResetEmail(email) 
  }

  async deleteAccount(): Promise<void> {
    return await this.angularFireAuth.auth.currentUser.delete()
  }

  public deleteUserFromDatabase(uid: string): Promise<void> {
    return this.userCollection.doc(uid).delete();
  }
}
  