// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginRedirectUrl: 'http://localhost:4200',
  firebase: {
    apiKey: "AIzaSyD3jewQCobjtV6BwUvz7mycmd9xU8FFfWM",
    authDomain: "angulartest-70bea.firebaseapp.com",
    databaseURL: "https://angulartest-70bea.firebaseio.com",
    projectId: "angulartest-70bea",
    storageBucket: "angulartest-70bea.appspot.com",
    messagingSenderId: "831333357024",
    appId: "1:831333357024:web:f94a2da2d6df7df7"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
