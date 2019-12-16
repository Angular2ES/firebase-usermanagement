import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupCol: AngularFirestoreCollection = this.db.collection('groups');

  constructor(private db: AngularFirestore) {}

  /**
   * @param userId owner of the group
   * @param groupName
   * @param extraGroupData 
   * 
   * @usageNotes
   * Remove a user from a group
   * ```
   * let groupData = {
   *  description: 'hello'
   * }
   * createGroup('userId', 'Name', groupData);
   * ```
   */
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
  
  /**
   * @param groupId
   */
  public getGroup(groupId: string): Observable<any> {
    return this.groupCol.doc(groupId).valueChanges();
  }

  /**
   * @param groupId
   * @param data
   * 
   * @usageNotes
   * Remove a user from a group
   * ```
   * let groupData = {
   *  groupName: 'hello'
   * }
   * updateGroupData('groupId', groupData);
   * ```
   */
  async updateGroupData(groupId: string, data: any): Promise<void> {
    return this.groupCol.doc(groupId).update(data);
  }

  /**
   * @param userId
   * @param role
   * @param groupId
   */
  async addUsersToGroup(userId: string[], role: string, groupId: string): Promise<void> {
    const groupData = {
      groupId: groupId,
      users: {}
    }
    groupData.users[role] = firebase.firestore.FieldValue.arrayUnion.apply(null, userId);
    return this.groupCol.doc(groupId).set(groupData, { merge: true});
  }
  
  /**
   * Create a new account.
   * The user will not be logged in after creating an account
   * @param userId 
   * @param group 
   * 
   * @usageNotes
   * Remove a user from a group
   * ```
   * let group = {
   *  groupId: '123'
   *  users: {
   *    admins: ['userId']
   *  }
   * }
   * removeUsersFromGroup('userId', group);
   * ```
   */
  async removeUsersFromGroup(userId: string[], group: any): Promise<void> {
    try {
      const groupData = {
        users: {}
      }
      for (var roleKey in group.users) {
        groupData.users[roleKey] = firebase.firestore.FieldValue.arrayRemove.apply(null, userId)
      }
      return this.groupCol.doc(group.groupId).set(groupData, { merge: true});
    } catch(err) {
      console.error(err.message);
    }
  }

  /**
   * @param groupId
   */
  async deleteGroup(groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).delete();
  }

}
