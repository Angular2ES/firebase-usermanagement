import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { HttpClient } from 'selenium-webdriver/http';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {
  private user$: Observable<UserModel | null>;
  private col: AngularFirestoreCollection = this.db.collection('users');

  constructor(private db: AngularFirestore,
    private authService: AuthenticationService,
    private router: Router,
    private configService: ConfigService) {

    // TODO remove console logs
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
    .then((userCredential) => this.mapToDatabase(userCredential.user))
    .then((userCredential) => this.authService.logout().then(() => userCredential))
    .catch((e) => console.log(e));
  }

  private mapFromDatabase(userData): UserModel {
    return {
      uid: userData.uid,
      name: userData.name,
      age: userData.age,
      email: userData.email
    }
  }

  // public isNewUser (user: User): boolean {
  //   // first we check if the user has data in the db
  //   // if not we create a new user
  //   var isNew = false;
  //   var docRef = this.col.doc(user.uid);
  //   docRef.get().toPromise()
  //   .then((docSnapshot) => {
  //     if (docSnapshot.exists) {
  //       isNew = false;
  //       console.log('user has some data in db')
  //     } else {
  //       isNew = true;
  //       //this.mapFromDatabase(user)
  //     } //return docSnapshot.exists
  //   })
  //   return isNew;
  // }

  public mapToDatabase(user: User): Promise<void> {
    return this.configService.getConfig(user.uid)
    .then(() => {
      if (!user.emailVerified) this.authService.sendVerifyEmailLink(user);
      //console.log('doc succesfully created')
    })
  }

  public async updateUser(uid: string, userData): Promise<void> {
    return this.col.doc(uid).update(userData);
  }

  public getUser(): Observable<UserModel | null> {
    return this.user$;
  }

  public getUserFromDatabase(): Observable<any> {
    return this.authService.getUid().pipe(
      switchMap(uid => uid ? this.col.doc(uid).valueChanges() : of(null)),
      shareReplay(1)
    );
  }
}
