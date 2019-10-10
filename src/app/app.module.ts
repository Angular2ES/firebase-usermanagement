import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppHomeComponent } from './app-home/app-home.component';
import { LoginComponent } from './login-email-password/email-password-login.component';
import { HeaderComponent } from './header/header.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { UserSettingsTestComponent } from './user.settings.test.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupListContainerComponent } from './group-list/group-list-container/group-list-container.component';
import { AppComponent } from './app.component';

import { UserModuleConfig } from '../users-module-config';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// services
import { AuthenticationService } from 'src/services/auth.service';
import { UserAuthGuardService } from '../services/auth.services/user-auth-guard.service';
import { AdminAuthGuardService } from 'src/services/auth.services/admin-auth-guard.service';

// modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListContainerComponent } from './user-list-container/user-list-container.component';
import { GroupAdminAuthGuardService } from 'src/services/auth.services/groupAdmin-auth-gaurd.service';


const userModuleConfig: UserModuleConfig = {
  loginRedirectUrl: environment.loginRedirectUrl,
  redirectAfterLogin: '/home',
  redirectAfterLogout: '/login',
  firebaseCfg: environment.firebase
};

@NgModule({
  declarations: [
    LoginTestComponent,
    UserSettingsTestComponent,
    LoginComponent,
    UserSettingsComponent,
    AppHomeComponent,
    HeaderComponent,
    LoginEmailComponent,
    CreateAccountComponent,
    LoginGoogleComponent,
    GroupSettingsComponent,
    ValidationMessagesComponent,
    GroupListContainerComponent,
    GroupListComponent,
    UserListContainerComponent,
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterializeModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, 
    StorageModule.forRoot({ IDBNoWrap: true }), // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthenticationService, FormBuilder, ToasterService,
    UserAuthGuardService, AdminAuthGuardService, GroupAdminAuthGuardService,
    { provide: UserModuleConfig, useValue: userModuleConfig },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
