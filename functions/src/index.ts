import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FieldValue } from '@google-cloud/firestore';
admin.initializeApp();

// TODO clean this script up and seperate functionalities

export interface Group {
  groupId: string,
  groupName: string,
  users: string[];
}



// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const onCreateUser = functions.auth.user().onCreate((user) =>{
  admin.firestore().doc(`users/${user.uid}`).set({
    uid: user.uid
  })
  .then(() => {
    admin.firestore().doc(`user_private_profile/${user.uid}`).set({
      email: user.email
    }).then(() => {
      console.log('doc succesfully created'); 
    }).catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
})

export const onUpdateGroup = functions.firestore.document('groups/{groupId}').onWrite((change, context) => {
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
})

function addGroupToUser(userId: string, groupId: string): Promise<any>{
  return admin.firestore().doc(`users/${userId}`).set({
    groups: FieldValue.arrayUnion(groupId)
  }, { merge: true}).catch((e) => console.log(e))
}

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
