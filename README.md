## Table of Contents
- [Library's Components](#components)
- [Supported Providers](#supported-providers)
- [Supported Processes and Actions](#supported-procress-and-actions)
- [Supported Angular Guards](#supported-angular-guards)
- [Peer Dependencies](#peer-dependencies)
- [Installation](#installation)
- [testing](#testing)

<a name="components"/>

## Library's Components
- `<ng-register>` standalone registration component to create new accounts
- `<ng-login-email-password>` standalone login component with email & password
- `<ng-login-google>` standalone login component with the google provider
- `<ng-user-settings>` standalone user settings component
- `<ng-admin-settings>` standalone admin settings component
- `<ng-create-group>` standalone create group component
- `<ng-group-list>` standalone group list of current logged in user
- `<ng-group-settings>` standalone group settings component of given group
- `<ng-group-users-settings>` standalone user settings of given group

<a name="supported-providers"/>

## Supported Providers:
- email and password (traditional)
- google

<a name="supported-procress-and-actions"/>

## Supported Processes and Actions:
- sign up
- sign in
- sign out
- delete user's account
- Impersonate a user (admin only)
- firestore sync

## Supported Angular Guards
- `LoggedInGuard` used to protect angular routes from unauthenticated users (with fallback routes via `NgxAuthFirebaseUIConfig`)
- `AdminAuthGuard` used to protect angular routes from non admin users (with fallback routes via `NgxAuthFirebaseUIConfig`)

<a name="peer-dependencies"/>

## Peer Dependencies - please make sure that peerDependencies are installed

```json
"peerDependencies": {
    "@angular/common": "^8.2.0",
    "@angular/core": "^8.2.0",
    "@angular/router": "^8.2.10",
    "@angular/fire": "^5.2.1",
    "@angular/material": "8.2.3",
    "firebase": "^6.6.2",
    "rxjs": "~6.4.0"
  }
```
----

<a name="installation"/>

## Installation
## 1. Install with *npm*
Install all of the above dependencies with *npm*
Install the library with *npm*
```shell
npm install ng-usermanagement
```

## 2. Configs
Once you have installed the library you need to import the module into the main module.
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import the library
import { NgUserManagementModule } from 'ng-usermanagement';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  authGuardLoggedInURL: "[fallback Url]" // Fallback to this url if the user isn't logged in
  firebaseConfig: {
    apiKey: "[Project Key]",
    authDomain: "[Project Id].firebaseapp.com",
    databaseURL: "https://[Project Id].firebaseio.com",
    projectId: "[Project Id]",
    storageBucket: "[Project Id].appspot.com",
    messagingSenderId: "[messageSender Id]",
    appId: "[App Id]"
  }
};

const inputValidationConfig = {
  required: 'Required',
  email: 'Invalid email address',
  verifyPassword: 'Verify your password',
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgUserManagementModule.forRoot(firebaseConfig, inputValidationConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
## 3. firebase cloud functions
Copy and paste the firebase cloud functions into your cloud functions folder.
If the folder doens't exist yet run the following command.
```shell
firebase init functions
```
copy the following cloud functions [here](functions/src)

deploy the cloud functions with the following command.
```shell
firebase deploy --only functions
```

## 4. firestore rules
Copy and paste the firestore rules into your firestore rules file.
If the file doesn't exist yet run the following command.
```shell
firebase init firestore
```
copy the following firestore rules [here](firestore.rules)

deploy the firestore rules with the following command.
```shell
firebase deploy --only firestore:rules
```

## For development only

<a name="testing"/>

## start cypress testing
```shell
ng serve
npm run build:testConfig
npx cypress open
```

## start unit test
```shell
ng test ng-usermanagement
```

## Publishing to npm

Build the library.
```shell
ng build ng-usermanagement
```

navigate to the dist folder `cd dist/ng-usermanagement`
```shell
cd dist/ng-usermanagement
npm publish
```