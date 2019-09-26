import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { ApiService } from './api.service';

@Injectable()
export class UserService {
  private user$: Observable<UserModel | null>;
  private userCollection: AngularFirestoreCollection = this.db.collection('users');
  
  constructor(private db: AngularFirestore,
    private authService: AuthenticationService) {

      // TODO remove console logs
    this.user$ = this.authService.getUid().pipe(
      tap(uid => console.log({ uid })),
      switchMap(uid => uid ? this.userCollection.doc(uid).valueChanges() : of(null)),
      map(user => user ? this.mapFromDatabase(user) : null),
      tap(user => console.log({ user })),
      shareReplay(1)
    );
  }

  public createUser(email: string): Promise<void> {
    return this.authService.createAccount(email)
    .then((userCredential) => this.authService.logout())
    .catch((e) => console.log(e));
  }
  
  //TODO get email data from an other db table
  private mapFromDatabase(userData): UserModel {
    return {
      uid: userData.uid,
      name: userData.name,
      age: userData.age,
      email: null,
      groups: userData.groups
    }
  }
  
  public async updateUserPrivateProfile(uid: string, userData): Promise<void> {
    return this.db.collection('user_private_profile').doc(uid).update(userData);
  }

  public async updateUser(uid: string, userData): Promise<void> {
    return this.userCollection.doc(uid).update(userData);
  }

  public getUser(): Observable<UserModel | null> {
    return this.user$;
  }
}
  