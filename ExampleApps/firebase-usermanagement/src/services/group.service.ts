import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Group, GroupUsersPermissions } from '../models/group.model';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupCol: AngularFirestoreCollection = this.db.collection('groups');

  constructor(private db: AngularFirestore) {}

    
  public createGroup(userId: string, groupName: string): Promise<any> {
    const newId = this.db.createId();
    const groupData: Group = {
      groupId: newId,
      groupName: groupName,
      users: {
        admins: [userId]
      }
    }
    return this.groupCol.doc(newId).set(groupData).then(() => { console.log('group has been created')
    }).catch((e) => console.log(e));
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

  public updateGroupData(groupId: string, data: any): Promise<void> {
    return this.groupCol.doc(groupId).update(data)
    .then(succes => console.log('update succesfull'))
    .catch(err => console.log(err));
  }

  public addUsersToGroup(userId: string[], role: string, groupId: string): Promise<void> {
    const groupData: Group = {
      groupId: groupId,
      users: {}
    }
    groupData.users[role] = firebase.firestore.FieldValue.arrayUnion.apply(null, userId);
    return this.groupCol.doc(groupId).set(groupData, { merge: true});
  }
  
  public removeUsersFromGroup(userId: string[], groupId: string): Promise<void> {
    const groupData: Group = {
      groupId: groupId,
      users: {}
    }
    Object.keys(GroupUsersPermissions).forEach(roleKey => {
      groupData.users[roleKey] = firebase.firestore.FieldValue.arrayRemove.apply(null, userId)
    })
    return this.groupCol.doc(groupId).set(groupData, { merge: true});
  }

  public deleteGroup(groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).delete()
    .then(succes => console.log('delete succesfull'))
    .catch(err => console.log(err));
  }

}
