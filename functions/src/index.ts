import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { onCreateUser } from './user/user.module';
import { onUpdateGroup } from './group/group.module';

admin.initializeApp();

exports.onCreateUser = functions.auth.user().onCreate((user) => onCreateUser(user));
exports.onUpdateGroup = functions.firestore.document('groups/{groupId}').onWrite((change, context) => onUpdateGroup(change, context));
