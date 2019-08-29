import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './email-pass-login/login.component';
import { HeaderComponent } from './components/header.component';
import { LoginTestComponent } from './login.test.component';

import { UserModuleConfig } from '../users-module-config';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// services
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
// modules
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';

const fireModuleConfig: UserModuleConfig = environment.firebase;

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HeaderComponent,

    LoginTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterializeModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthenticationService, UserService,
    { provide: UserModuleConfig, useValue: fireModuleConfig }
  ],
  bootstrap: [HeaderComponent]
})

export class AppModule { }
