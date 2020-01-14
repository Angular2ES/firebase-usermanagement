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
  
  private mapFromDatabase(userData: any): UserModel {
    const _user: UserModel = {
      uid: userData.uid,
      name: userData.name,
      age: userData.age,
      groups: userData.groups
    }
    return _user;
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

  // TODO do not get all users at the same time...might be a lot of users
  public getAllUserList(): Observable<firebase.firestore.QuerySnapshot> {
    return this.userCollection.get();
  }
}
  