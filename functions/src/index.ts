import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const createUser = functions.https.onRequest((request, response) => {
  admin.firestore().doc(`users/${request.body.uid}`).set({
      uid: request.body.uid
    })
    .then((data) => {console.log('doc succesfully created'); response.send(data);})
    .catch((err) => {console.log(err); response.status(500).send(err)})
});

export const createGroup = functions.https.onRequest((request, response) => {
  admin.firestore().doc(`groups/${request.body.groupId}`).set({
    groupName: request.body.groupName,
    groupId: request.body.groupId,
    permissions: {
      admins: [request.body.uid]
    },
    users: [request.body.uid]
  })
  .then((data) => {
    console.log('group has been created'); 
    addGroupToUser(request.body.uid, request.body.groupId);
  })
  .catch((err) => {console.log(err); response.status(500).send(err)})
})

export const addUserToGroup = functions.https.onRequest((request, response) => {
  admin.firestore().doc(`users/${request.body.groupId}`).set({
    users: firestore.FieldValue.arrayUnion(request.body.uid)
  }).then((data) =>  {console.log(data); addGroupToUser(request.body.uid, request.body.groupId);})
  .catch((err) => {console.log(err); })
})

// TODO create an onUpdateGroupData where we can check if we added a user
// if we added a user we can add this group to the user

// export const updateGroup = functions.firestore.document('/groups').onUpdate(( change, context ) => {
//   const before = change.before.data().users;
//   const after = change.after.data().users;
//   if (after != before) 
//   // if (context.params.users != null && change.before != change.after){
//   //   addGroupToUser();
//   // }
// })

function addGroupToUser(userId: string, groupId: string) {
  admin.firestore().doc(`users/${userId}`).set({
    groups: firestore.FieldValue.arrayUnion(groupId)
  }).then((data) => console.log(data))
  .catch((err) => {console.log(err); })
}

// export const onCreateUser = functions.database
// .ref('/users/{uid}')
// .onCreate((snapshot, context) => {
//   uid = context.params.uid;

// })
