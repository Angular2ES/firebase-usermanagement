import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group.model';
import * as firebase from 'firebase';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable()
export class GroupService {

  private userCol: AngularFirestoreCollection = this.db.collection('users');
  private groupCol: AngularFirestoreCollection = this.db.collection('groups');


  constructor(private db: AngularFirestore,
    private authService: AuthenticationService,
    private router: Router,
    private configService: ConfigService) {}

  public addUsersToGroup(userId: string[], groupId: string): Promise<void> {
    return this.userCol.doc(groupId).update({
      users: firebase.firestore.FieldValue.arrayUnion(userId)
    });
  }

  public createGroup(userId: string, groupName: string): Promise<any> {
    return this.configService.createGroup(userId, this.db.createId(), groupName)
    .then((data) => console.log('group has been created')) // TODO let user know this
    .catch((err) => console.log(err));
  }

  public getGroup(groupId: string): Observable<Group> {
    return this.groupCol.doc(groupId).valueChanges().pipe(
      map(data => data ? this.mapFromDatabase(data) : null)
    )
  }

  private mapFromDatabase(data): Group {
    return {
      groupId: data.groupId,
      groupName: data.groupName,
      users: data.users
    }
  }

}
