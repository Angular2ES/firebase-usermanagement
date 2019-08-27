import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of, observable, EMPTY } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap, mergeMap, first, tap, shareReplay } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<UserModel>;

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
  }

  saveUser(): void {
    var col: AngularFirestoreCollection = this.db.collection('users');

    // todo remove console logs
    this.user$ = this.authService.getUid().pipe(
      tap(uid => console.log({ uid })),
      switchMap(uid => uid ? col.doc(uid).valueChanges() : of(null)),
      map(user => user ? this.mapToUserModel(user) : null),
      tap(user => console.log({ user })),
      shareReplay(1)
    );
  }

  private mapToUserModel(userData): UserModel {
    return {
      uid: userData.uid,
      name: userData.name,
      age: userData.age
    }
  }

  public getUser(): Observable<UserModel> {
    return this.user$;
  }

  public logout(): void {
    this.user$ = null;
  }


}
