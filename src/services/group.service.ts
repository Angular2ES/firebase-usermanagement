import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group.model';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class GroupService {

  private groupCol: AngularFirestoreCollection = this.db.collection('groups');


  constructor(private db: AngularFirestore,
    private userService: UserService) {}

  public addUsersToGroup(userId: string[], groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).set({
      users: firebase.firestore.FieldValue.arrayUnion.apply(null, userId)
    }, { merge: true});
  }

  public createGroup(userId: string, groupName: string): Promise<any> {
    const newId = this.db.createId();
    const groupData = {
      groupId: newId,
      groupName: groupName,
      users: [userId]
    }
    return this.groupCol.doc(newId).set(groupData).then(() => {
    }).catch((e) => console.log(e));
  }

  public getGroup(groupId: string): Observable<Group> {
    return this.groupCol.doc(groupId).valueChanges().pipe(
      map(data => data ? this.mapFromDatabase(data) : null)
    )
  }

  public getGroupPermissions(groupId: string): Observable<any> {
    return this.groupCol.doc(groupId).valueChanges().pipe(
      map(data => data ? this.mapGroupPermissions(data) : null)
    )
  }

  private mapGroupPermissions(data): any{
    return {
      permisions: data.permisions
    }
  }

  private mapFromDatabase(data): Group {
    return {
      groupId: data.groupId,
      groupName: data.groupName,
      users: data.users
    }
  }

  public updateGroupData(groupId: string, data: any): Promise<void> {
    return this.groupCol.doc(groupId).update(data)
    .then(succes => console.log('update succesfull'))
    .catch(err => console.log(err));
  }

  public deleteGroup(groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).delete()
    .then(succes => console.log('delete succesfull'))
    .catch(err => console.log(err));
  }

}
