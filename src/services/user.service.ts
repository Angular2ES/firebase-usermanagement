import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<User | null>;
  private uid;

  constructor(private db: AngularFirestore, authService: AuthenticationService) {
    //authService.getFirebaseApp().auth().onAuthStateChanged((user) => {
    //  if (user) {
    //    // User logged in already or has just logged in.
    //    console.log(user.uid);
    //  } else {
    //    // User not logged in or has just logged out.
    //  }
    //});

    //this.userCollection = this.db.collection('user');
    this.uid = authService.uid$;

    //firebase.auth().onAuthStateChanged(function (user) {
    //  if (user) {
    //    console.log(this.user$);
    //    this.user$ = user;
    //    // User is signed in.
    //  }
    //});
  }

  public getUserId() {
    return this.uid;
  }

  getUser() {

  }
}
