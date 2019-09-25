import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export interface UserGroup {
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
  const oldDoc = change.before.data() as UserGroup;
  const newDoc = change.after.data() as UserGroup;
  if (oldDoc !== undefined && newDoc !== undefined) {
    // console.log(newDoc);
    console.log([oldDoc.users.length, newDoc.users.length]);
    if (newDoc.users.length > oldDoc.users.length) {
      console.log('kak');
      return addGroupToUser(newDoc.users[newDoc.users.length - 1], newDoc.groupId);
    }
  } 
  if(oldDoc === undefined && newDoc !== undefined) {
    console.log('lul!');
    return addGroupToUser(newDoc.users[newDoc.users.length - 1], newDoc.groupId);
  }
  return Promise.resolve();
})

function addGroupToUser(userId: string, groupId: string){
  return admin.firestore().doc(`users/${userId}`).set({
    groups: [groupId]
  }, { merge: true}).catch((e) => console.log(e))
}


// export const onUpdateGroup = functions.firestore.document('groups').onWrite((change, context) => {
//   const oldDocument = change.before.data();
//   // const userId = context.auth ? context.auth.uid : null
//   const document = change.after.exists ? change.after.data() : null;
//   if (document != null && oldDocument != null) {
//     document.users.forEach((userId: string) => {
//       admin.firestore().doc(`users/${userId}/groups/${document.groepId}`).set({
//         groupId: document.groepId,
//       }).then(() => console.log('doc succesfully created'))
//       .catch((err) => console.log(err))
//     })
//   }
// })
