import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupCol: AngularFirestoreCollection = this.db.collection('groups');

  constructor(private db: AngularFirestore) {}

    
  async createGroup(userId: string, groupName: string, extraGroupData?: any): Promise<void> {
    const newId = this.db.createId();
    let groupData = {
      groupId: newId,
      groupName: groupName,
      users: {
        owner: [userId]
      }
    }
    if (extraGroupData != null) groupData = {...groupData, ...extraGroupData}
    return this.groupCol.doc(newId).set(groupData);
  }
  
  public getGroup(groupId: string): Observable<any> {
    return this.groupCol.doc(groupId).valueChanges();
  }

  async updateGroupData(groupId: string, data: any): Promise<void> {
    return this.groupCol.doc(groupId).update(data);
  }

  async addUsersToGroup(userId: string[], role: string, groupId: string): Promise<void> {
    const groupData = {
      groupId: groupId,
      users: {}
    }
    groupData.users[role] = firebase.firestore.FieldValue.arrayUnion.apply(null, userId);
    return this.groupCol.doc(groupId).set(groupData, { merge: true});
  }
  
  async removeUsersFromGroup(userId: string[], groupId: string): Promise<void> {
    try {
      const groupData = {
        users: {}
      }
      this.getGroup(groupId).pipe(
        map(group => {
          for (var roleKey in group.users) {
            groupData.users[roleKey] = firebase.firestore.FieldValue.arrayRemove.apply(null, userId)
          }
          return this.groupCol.doc(groupId).set(groupData, { merge: true});
        })
      ).subscribe()
    } catch(err) {
      console.error(err.message);
    }
  }

  async deleteGroup(groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).delete();
  }

}
