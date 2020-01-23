export class UserModuleConfig {
  // Used to redirect after clicking the login email link
  loginRedirectUrl: string;
  // After succesfull login redirect to
  redirectAfterLogin: string;
  // After succesful logout redirect to
  redirectAfterLogout: string;
  // Used to create a secondary app to register users without login directly in as that user
  firebaseConfig: any;

  // apiKey: string;
  // authDomain: string;
  // databaseURL: string;
  // projectId: string;
  // storageBucket: string;
  // messagingSenderId: string;
  // appId: string;
  

}
