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
    this.uid = authService.uid$;
  }

  public getUserId() {
    return this.uid;
  }

  getUser() {
    return firebase.auth().currentUser;
  }
}
