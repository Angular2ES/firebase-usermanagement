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
    return this.groupCol.doc(groupId).update({
      users: firebase.firestore.FieldValue.arrayUnion(userId) // TODO on update add group to user we do this in the functions index.ts
    });
  }

  public createGroup(userId: string, groupName: string): Promise<any> {
    const newId = this.db.createId();
    const groupData = {
      groupId: newId,
      groupName: groupName,
      users: [userId]
    }
    return this.groupCol.doc(newId).set(groupData).then(() => {
      //this.userService.addGroupToUser(userId, newId).catch((e) => console.log(e))
    }).catch((e) => console.log(e));
    // return this.apiService.createGroup(userId, this.db.createId(), groupName)
    // .then((data) => console.log('group has been created')) // TODO let user know this
    // .catch((err) => console.log(err));
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

}
