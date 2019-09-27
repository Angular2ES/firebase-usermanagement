import admin = require("firebase-admin");
import * as functions from 'firebase-functions';
import { FieldValue } from "@google-cloud/firestore";


export interface Group {
  groupId: string,
  groupName: string,
  users: string[];
}

export function onUpdateGroup(change: functions.Change<FirebaseFirestore.DocumentSnapshot>, context: functions.EventContext) {
  const oldDoc = change.before.data() as Group;
  const newDoc = change.after.data() as Group;

  // both old and new data exist
  if (oldDoc !== undefined && newDoc !== undefined) {
    // if a user was added he will also get a new group
    if (newDoc.users.length > oldDoc.users.length) {
      return addGroupToUsers(getUserDifference(newDoc.users, oldDoc.users), newDoc.groupId);
    }
    // if a user was removed we remove the group from the user 
    else if (newDoc.users.length < oldDoc.users.length) {
      return removeGroupFromUsers(getUserDifference(oldDoc.users, newDoc.users), newDoc.groupId)
    }
  }
  // the group was just created
  else if(oldDoc === undefined && newDoc !== undefined) {
    return addGroupToUsers([newDoc.users[newDoc.users.length - 1]], newDoc.groupId);
  }
  // the newData was complete deleted
  else if(oldDoc !== undefined && newDoc == undefined){
    return removeGroupFromUsers(oldDoc.users, oldDoc.groupId);
  }
  return Promise.resolve();
}

function addGroupToUsers(users: string[], groupId: string): Promise<any>{
  const batch = admin.firestore().batch();

  users.forEach(userId => {
    const userRef = admin.firestore().doc(`users/${userId}`);
    batch.set(userRef, {
      groups: FieldValue.arrayUnion(groupId)
    }, { merge: true})
  })

  return batch.commit()
  .then(() => console.log('succes'))
  .catch((e) => console.log(e))
}

function removeGroupFromUsers(users: string[], ToRemoveGroupId: string): Promise<any> {
  const batch = admin.firestore().batch();

  users.forEach(userId => {
    const userRef = admin.firestore().doc(`users/${userId}`);
    batch.update(userRef, {
      groups: FieldValue.arrayRemove(ToRemoveGroupId)
    });
  })
  return batch.commit()
  .then(() => console.log('succes'))
  .catch((e) => console.log(e))
}

function getUserDifference(largeUserList: string[], smalUserList: string[]): string[] {
  const users = largeUserList.filter(user => filterUser(user, smalUserList));
  console.log(users);
  return users;
}

function filterUser(curUser: string, smalUserList: string[]): boolean{
  let hasUser: boolean = false;
  smalUserList.forEach(newUser => {
    if (newUser === curUser) hasUser = true;
  }) 
  return !hasUser;
}