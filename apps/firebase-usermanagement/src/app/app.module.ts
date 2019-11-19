import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageModule } from '@ngx-pwa/local-storage';
import { MaterializeModule } from 'angular2-materialize';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { NgUserManagementModule } from 'libs/ng-usermanagement/src/public-api';
import { environment } from '../environments/environment';
// services
import { AuthenticationService } from '../services/auth.service';
import { AdminAuthGuardService } from '../services/auth.services/admin-auth-guard.service';
import { GroupAdminAuthGuardService } from '../services/auth.services/groupAdmin-auth-gaurd.service';
import { UserAuthGuardService } from '../services/auth.services/user-auth-guard.service';
import { UserModuleConfig } from '../users-module-config';
import { AppHomeComponent } from './app-home/app-home.component';
// modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GroupListContainerComponent } from './group-list/group-list-container/group-list-container.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { HeaderComponent } from './header/header.component';
import { LoginTestComponent } from './login.test.component';
import { UserListContainerComponent } from './user-list-container/user-list-container.component';
import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { UserSettingsTestComponent } from './user.settings.test.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';

// TODO remove this after refactoring
const userModuleConfig: UserModuleConfig = {
  loginRedirectUrl: environment.loginRedirectUrl,
  redirectAfterLogin: '/home',
  redirectAfterLogout: '/login',
  firebaseConfig: environment.firebase
};

@NgModule({
  declarations: [
    LoginTestComponent,
    UserSettingsTestComponent,
    UserSettingsComponent,
    AppHomeComponent,
    HeaderComponent,
    CreateAccountComponent,
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

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, 
    StorageModule.forRoot({ IDBNoWrap: true }), // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule // imports firebase/storage only needed for storage features
    
    NgUserManagementModule.forRoot(userModuleConfig),
  ],
  providers: [
    AuthenticationService, FormBuilder, ToasterService,
    UserAuthGuardService, AdminAuthGuardService, GroupAdminAuthGuardService,
    { provide: UserModuleConfig, useValue: userModuleConfig },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
