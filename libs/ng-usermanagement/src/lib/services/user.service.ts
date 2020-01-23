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
  public readonly user$: Observable<UserModel>;
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
   * @param uid 
   * @param userData 
   */ 
  public updateUser(uid: string, userData: any): Promise<void> {
    return this.userCollection.doc(uid).update(userData);
  }

  /**
   * Get user data with Id
   * @param userId 
   */
  public getUserWithId(uid: string): Observable<UserModel> {
    return this.userCollection.doc(uid).valueChanges().pipe(
      map(user => user as UserModel),
      shareReplay(1)
    )
  }
}
  