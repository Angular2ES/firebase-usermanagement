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
  admin.firestore().doc(`groups/${request.body.uid}`).set({
    groupName: request.body.groupName,
    groupId: request.body.groupId,
    permissions: {
      admins: [request.body.uid]
    },
    users: [request.body.uid]
  })
  .then((data) => {
    console.log('group has been created'); 
    admin.firestore().doc(`users/${request.body.uid}`).set({
      users: firestore.FieldValue.arrayUnion(request.body.uid)
    }).then((data) => response.send(data))
    .catch((err) => {console.log(err); response.status(500).send(err)})
  })
  .catch((err) => {console.log(err); response.status(500).send(err)})
})

// export const onCreateUser = functions.database
// .ref('/users/{uid}')
// .onCreate((snapshot, context) => {
//   uid = context.params.uid;

// })
