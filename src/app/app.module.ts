import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';

import { UserModuleConfig } from '../users-module-config';

import { MaterializeModule } from 'angular2-materialize';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';

// services
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { AppRoutingModule } from './app-routing.module';

const fireModuleConfig: UserModuleConfig = environment.firebase;

// Not ideal
firebase.initializeApp(fireModuleConfig);

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterializeModule,

    AngularFireModule.initializeApp(environment.firebase), // TODO remove app name
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthenticationService, UserService,
    { provide: UserModuleConfig, useValue: fireModuleConfig }
  ],
  bootstrap: [AppComponent, LoginComponent, HeaderComponent]
})

export class AppModule { }
