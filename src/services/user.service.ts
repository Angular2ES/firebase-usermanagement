import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';

@Injectable()
export class UserService {
  private user$: Observable<UserModel | null>;
  private col: AngularFirestoreCollection = this.db.collection('users');

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {

    // todo remove console logs
    this.user$ = this.authService.getUid().pipe(
      tap(uid => console.log({ uid })),
      switchMap(uid => uid ? this.col.doc(uid).valueChanges() : of(null)),
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

  public async updateUser(userData): Promise<void> {
    this.authService.getUid().pipe(
      switchMap(uid => uid ? this.col.doc(uid).update(userData) : null),
    )
    //return this.col.doc(this.authService.getUid()).update(userData);
      // this.authService.getAuthState().pipe(
      // map(user => user ? user.updateEmail(email) : null)
    
  }

  public getUser(): Observable<UserModel | null> {
    return this.user$;
  }

  public isOnline(): Observable<boolean> {
    return this.user$.pipe(map(user => !!user));
  }
}
