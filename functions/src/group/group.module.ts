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
      return addGroupToUser(newDoc.users[newDoc.users.length - 1], newDoc.groupId);
    }
    // if a user was removed we remove the group from the user 
    else if (newDoc.users.length < oldDoc.users.length) {
      removeGroupFromUsers(getRemovedUsers(oldDoc.users, newDoc.users), newDoc.groupId)
    }
  }
  // the group was just created
  else if(oldDoc === undefined && newDoc !== undefined) {
    return addGroupToUser(newDoc.users[newDoc.users.length - 1], newDoc.groupId);
  }
  // the newData was complete deleted
  else if(oldDoc !== undefined && newDoc == undefined){
    removeGroupFromUsers(oldDoc.users, oldDoc.groupId);
  }
  return Promise.resolve();
}

function addGroupToUser(userId: string, groupId: string): Promise<any>{
  return admin.firestore().doc(`users/${userId}`).set({
    groups: FieldValue.arrayUnion(groupId)
  }, { merge: true}).catch((e) => console.log(e))
}

// large ammount off users to delete will not work
function removeGroupFromUsers(users: string[], ToRemoveGroupId: string) {
  users.forEach(userId => {
    admin.firestore().doc(`users/${userId}`).update({
      groups: FieldValue.arrayRemove(ToRemoveGroupId)
    }).catch(e => console.log(e))
  })
}

function getRemovedUsers(oldUsers: string[], newUsers: string[]): string[] {
  const users = oldUsers.filter(user => filterUser(user, newUsers));
  console.log(users);
  return users;
}

function filterUser(oldUser: string, newUsers: string[]): boolean{
  let hasUser: boolean = false;
  newUsers.forEach(newUser => {
    if (newUser === oldUser) hasUser = true;
  }) 
  return !hasUser;
}