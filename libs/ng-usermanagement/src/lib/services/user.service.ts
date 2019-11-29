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
  private user$: Observable<any>;
  private userCollection: AngularFirestoreCollection = this.db.collection('users');
  
  constructor(private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth) {
      
    this.user$ = this.firebaseUser.pipe(
      switchMap((fbUser) => fbUser ? this.userCollection.doc(fbUser.uid).valueChanges() : new Observable<any>()),
      shareReplay(1)
      );
  }

/**
 * Get the firebase user that is current logged in
 */
  get firebaseUser(): Observable<User> {
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
  public getCurrentUser(): Observable<any> {
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

  public deleteUserFromDatabase(uid: string): Promise<void> {
    return this.userCollection.doc(uid).delete();
  }
}
  