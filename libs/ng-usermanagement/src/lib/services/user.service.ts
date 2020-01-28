import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Current logged in user
   */
  public readonly user$: Observable<UserModel>;

  /**
   * user collection in firestore
   */
  private userCollection: AngularFirestoreCollection = this.db.collection('users');
  
  constructor(
    private db: AngularFirestore,
    private angularFireAuth: AngularFireAuth) {
      
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((fbUser) => fbUser ? this.userCollection.doc(fbUser.uid).valueChanges() : of(null)),
      map(user => user as UserModel),
      shareReplay(1)
      );
  }

  /**
   * Update the user data in firestore
   * @param uid 
   * @param userData 
   */ 
  public updateUser(uid: string, userData: Object): Promise<void> {
    return this.userCollection.doc(uid).update(userData);
  }

  /**
   * Get user data from firestore with the Id
   * @param userId 
   */
  public getUserWithId(uid: string): Observable<UserModel> {
    return this.userCollection.doc(uid).valueChanges().pipe(
      map(user => user as UserModel),
      shareReplay(1)
    )
  }
}
  