import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  /**
   * Group collection of firestore
   */
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
  createGroup(userId: string, groupName: string, extraGroupData?: Object): Promise<void> {
    const newId = this.db.createId();
    let groupData = {
      groupId: newId,
      groupName: groupName,
      users: {
        owner: [userId]
      }
    }
    groupData = {...groupData, ...extraGroupData}
    return this.groupCol.doc(newId).set(groupData);
  }
  
  /**
   * Get a group with an group Id
   * @param groupId
   */
  public getGroup(groupId: string): Observable<Group> {
    return this.groupCol.doc(groupId).valueChanges().pipe(
      map((group) => group as Group)
    );
  }

  /**
   * Update group data
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
  updateGroupData(groupId: string, data: Object): Promise<void> {
    return this.groupCol.doc(groupId).update(data);
  }

  /**
   * Add an user to a group
   * @param userId
   * @param role
   * @param groupId
   */
  addUsersToGroup(userId: string[], role: string, groupId: string): Promise<void> {
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
  removeUsersFromGroup(userId: string[], group: Group): Promise<void> {
    const groupData = {
      users: {}
    }
    for (var roleKey in group.users) {
      groupData.users[roleKey] = firebase.firestore.FieldValue.arrayRemove.apply(null, userId)
    }
    return this.groupCol.doc(group.groupId).set(groupData, { merge: true});
  }

  /**
   * Delete a group with an Id
   * @param groupId
   */
  async deleteGroup(groupId: string): Promise<void> {
    return this.groupCol.doc(groupId).delete();
  }

}
