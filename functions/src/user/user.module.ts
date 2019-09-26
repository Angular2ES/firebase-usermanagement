import admin = require("firebase-admin");

export function onCreateUser(user: admin.auth.UserRecord ) {
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
};

export function onDeleteUser(user: admin.auth.UserRecord) {
  admin.firestore().doc(`users/${user.uid}`).delete()
  .then(() => {
    admin.firestore().doc(`user_private_profile/${user.uid}`).delete()
    .then(() => {
      console.log('doc succesfully deleted'); 
    }).catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
}

