import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group.model';
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
    const groupData: Group= {
      groupId: newId,
      groupName: groupName,
      users: {
        admins: [userId]
      }
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

  public addUsersToGroup(userId: string[], role: string, groupId: string): Promise<void> {
    const groupData: Group = {
      groupId: groupId,
      users: {}
    }
    groupData.users[role] = firebase.firestore.FieldValue.arrayUnion.apply(null, userId);
    return this.groupCol.doc(groupId).set(groupData, { merge: true});
  }
  
  // TODO make it so we can add more roles within this group
  public removeUsersFromGroup(userId: string[], groupId: string): Promise<void> {
    const groupData: Group = {
      groupId: groupId,
      users: {
        readOnly: firebase.firestore.FieldValue.arrayRemove.apply(null, userId),
        editors: firebase.firestore.FieldValue.arrayRemove.apply(null, userId),
        admins: firebase.firestore.FieldValue.arrayRemove.apply(null, userId)
      }
    }
    return this.groupCol.doc(groupId).set(groupData, { merge: true});
  }

  public deleteGroup(groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).delete()
    .then(succes => console.log('delete succesfull'))
    .catch(err => console.log(err));
  }

}
