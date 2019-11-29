import * as admin from "firebase-admin";
import * as functions from 'firebase-functions';


export interface UserModel {
  uid: string;
  name: string;
  groups: string[];
}

export function createUserToken(req: functions.https.Request, res: functions.Response) {
  const uid: string = req.body['uid']
  admin.auth().createCustomToken(uid)
    .then((customToken: string) => {
      // Send token back to client
      console.log('User token', customToken)
      res.status(200).send(customToken)
    })
    .catch((e: any) => console.log(e));
};
