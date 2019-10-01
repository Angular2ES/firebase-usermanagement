import { Injectable } from "@angular/core";
import { AuthenticationService } from './auth.service';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<UserModel | null>;
  private userCollection: AngularFirestoreCollection = this.db.collection('users');
  
  constructor(private db: AngularFirestore,
    private authService: AuthenticationService) {
      
    this.user$ = this.authService.getUid().pipe(
      switchMap(uid => uid ? this.userCollection.doc(uid).valueChanges() : of(null)),
      map(user => user ? this.mapFromDatabase(user) : null),
      shareReplay(1)
      );
  }
  
  public createUser(email: string): Promise<void> {
    return this.authService.createAccount(email)
    .then((userCredential) => this.authService.logout())
    .catch((e) => console.log(e));
  }
  
  //TODO get email data from an other db table
  private mapFromDatabase(userData: any): UserModel {
    const _user: UserModel = {
      uid: userData.uid,
      name: userData.name,
      age: userData.age,
      email: null,
      groups: userData.groups
    }
    // this.authService.getAuthState().subscribe((user => _user.email = user.email)).unsubscribe();
    return _user;
  }
  
  public async updateUserPrivateProfile(uid: string, userData): Promise<void> {
    return this.db.collection('user_private_profile').doc(uid).update(userData);
  }
  
  public async updateUser(uid: string, userData): Promise<void> {
    return this.userCollection.doc(uid).update(userData);
  }

  public getCurrentUser(): Observable<UserModel | null> {
    return this.user$;
  }

  public getUserWithId(userId): Observable<UserModel | null> {
    return this.userCollection.doc(userId).valueChanges().pipe(
      map(user => this.mapFromDatabase(user)),
      shareReplay(1)
    )
  }
  

  public getAllUserList(): Observable<firebase.firestore.QuerySnapshot> {
    return this.userCollection.get();
    // .pipe(
    //   map((querySnapshot) => {
    //     const users = [];
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         users.push(doc.id);
    //     });
    //     return users;
    //   })
    // )
  }
}
  