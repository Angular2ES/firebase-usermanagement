import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<UserModel | null>;

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
    var col: AngularFirestoreCollection = this.db.collection('users');

    // todo remove console logs
    this.user$ = this.authService.getUid().pipe(
      tap(uid => console.log({ uid })),
      switchMap(uid => uid ? col.doc(uid).valueChanges() : of(null)),
      map(user => user ? this.mapFromDatabase(user) : null),
      tap(user => console.log({ user })),
      shareReplay(1)
    );
  }

  private mapFromDatabase(userData): UserModel {
    return {
      uid: userData.uid,
      name: userData.name,
      age: userData.age
    }
  }

  public getUser(): Observable<UserModel | null> {
    return this.user$;
  }

  public isOnline(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }
}
