## Table of Contents
- [Library's Components](#components)
- [Supported Providers](#supported-providers)
- [Supported Processes and Actions](#supported-procress-and-actions)
- [Supported Angular Guards](#supported-angular-guards)
- [Peer Dependencies](#peer-dependencies)
- [Installation](#installation)

<a name="components"/>

## Library's Components
- `<ng-register>` standalone registration component to create new accounts [see more](docs/ng-register.md)
- `<ng-login-email-password>` standalone login component with email & password [see more](docs/ng-login-email-password.md)
- `<ng-login-google>` standalone login component with the google provider [see more](docs/ng-login-google.md)

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

<a name="supported-angular-guards"/>

## Supported Angular Guards
- `LoggedInGuard` used to protect angular routes from unauthenticated users (with fallback routes via `NgxAuthFirebaseUIConfig`)
- `AdminAuthGuard` used to protect angular routes from non admin users (with fallback routes via `NgxAuthFirebaseUIConfig`)

<a name="peer-dependencies"/>

## Peer Dependencies - please make sure that peerDependencies are installed if you are not using the schematics

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
## 1. Install with *ng add*
If Angular Material Design is not setup, just run
```shell
ng add @angular/material
``` 

Now you can add the library with *ng add*
```shell
ng add ng-usermanagement
```

## 2. Install with *npm* (Alternative)
Install all of the above dependencies with *npm*
Install the library with *npm*
```shell
npm install ng-usermanagement
```

## 3. Configs
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
