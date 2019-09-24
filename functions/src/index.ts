import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

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
  var oldDoc = change.before.exists ? change.before.data() : null;
  var newDoc = change.after.exists ? change.after.data() : null;
  if (oldDoc != null && newDoc != null){
    console.log(newDoc);
    if (newDoc.users.lenght > oldDoc.users.lenght) {
      addGroupToUser(newDoc.users[newDoc.users.lenght], newDoc.groupId);
    }
  } if(oldDoc == null && newDoc != null) addGroupToUser(newDoc.users[newDoc.users.lenght], newDoc.groupId);
})

function addGroupToUser(userId: string, groupId: string){
  const userData = {
    groups: admin.firestore.FieldValue.arrayUnion(groupId)
  }
  admin.firestore().doc(`users/${userId}`).update(userData).catch((e) => console.log(e))
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
