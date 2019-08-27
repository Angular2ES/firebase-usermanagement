import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of, observable, EMPTY } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { currentId } from 'async_hooks';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fbUser$: Observable<{} | null>;
  private user$: Observable<UserModel>;

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
  }

  setupModel(): void {
    var col: AngularFirestoreCollection = this.db.collection('users');

    this.authService.getAuthState().subscribe(user => {
      if (user && user.uid) {
        this.fbUser$ = col.doc(user.uid).valueChanges();
        this.subscripeUserData();
        return;
      } else {
        return EMPTY;
      }
    })
  }

  saveUser(): void {
    var col: AngularFirestoreCollection = this.db.collection('users');
    this.isLoggedIn().pipe(
      tap(user => console.log(user)),
      map(user => {
        if (user && user.uid) {
          const curUser: Observable<{}> = col.doc(user.uid).valueChanges();
          curUser.pipe(map(user => this.setUserData(user)))
        } else {}
      })
    )
    return;
  }

  isLoggedIn(): Observable<User> {
    return this.authService.getAuthState().pipe(first());
  }

  public subscripeUserData(): void {
    this.fbUser$.subscribe(
      (res) => this.setUserData(res),
      (err) => console.log(err),
      () => console.log('done'));
  }

  /**
  * @typedef {Object} userData
  * @property {Number} age - age.
  * @property {String} name - display name.
  * @property {String} uid - user id.
  */

  /**
  * @param {userData[]}
  */
  private setUserData(userData): Observable<UserModel> {
    const data: UserModel = {
      uid: userData.uid,
      name: userData.name,
      age: userData.age
    }

    this.user$ = of(data);
    return this.user$;
  }

  public getUser(): Observable<UserModel> {
    return this.user$;
  }

  public logout(): void {
    this.user$ = null;
    this.fbUser$ = null;
  }


}
