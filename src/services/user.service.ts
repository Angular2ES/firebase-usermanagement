import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private user$: Observable<UserModel | null>;
  private col: AngularFirestoreCollection = this.db.collection('users');

  constructor(private db: AngularFirestore, private authService: AuthenticationService, private router: Router) {

    // todo remove console logs
    this.user$ = this.authService.getUid().pipe(
      tap(uid => console.log({ uid })),
      switchMap(uid => uid ? this.col.doc(uid).valueChanges() : of(null)),
      map(user => user ? this.mapFromDatabase(user) : null),
      tap(user => console.log({ user })),
      shareReplay(1)
    );
  }

  public createUser(email: string): Promise<void> {
    return this.authService.createAccount(email)
    .then((userCredential) => this.mapToDatabase(userCredential.user.uid))
    .then((userCredential) => this.authService.logout('/login').then(() => userCredential).catch((e) => console.log(e)))
  }

  private mapFromDatabase(userData): UserModel {
    return {
      uid: userData.uid,
      name: userData.name,
      age: userData.age
    }
  }

  public mapToDatabase(uid: string): Promise<void> {
    var docRef = this.col.doc(uid);
    return docRef.set({
      uid: uid
    }).then(() => console.log('doc succesfully created'));
  }

  public async updateUser(uid: string, userData): Promise<void> {
    return this.col.doc(uid).update(userData).then(() => console.log('done updating'))
  }

  public getUser(): Observable<UserModel | null> {
    return this.user$;
  }
}
