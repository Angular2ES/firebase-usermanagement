import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-email-password/email-password-login.component';
import { HeaderComponent } from './header/header.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginGoogleComponent } from './login-google/login-google.component';
import { UserSettingsTestComponent } from './user.settings.test.component';

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
import { LoginHelper } from './login-helper.service'
import { UserAuthGuardService } from '../services/user-auth-guard.service';
import { AdminAuthGuardService } from 'src/services/admin-auth-guard.service';
import { ConfigService } from 'src/services/config.service';
import { GroupService } from 'src/services/group.service';

// modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const userModuleConfig: UserModuleConfig = {
  loginRedirectUrl: environment.loginRedirectUrl,
  redirectAfterLogin: '/home',
  redirectAfterLogout: '/login',
  firebaseCfg: environment.firebase
};

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HeaderComponent,
    UserSettingsComponent,
    
    LoginTestComponent,
    UserSettingsTestComponent,
    
    LoginEmailComponent,
    
    CreateAccountComponent,
    
    LoginGoogleComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    AuthenticationService, UserService, GroupService, LoginHelper, FormBuilder, ToasterService,
    UserAuthGuardService, AdminAuthGuardService, ConfigService,
    { provide: UserModuleConfig, useValue: userModuleConfig },
  ],
  bootstrap: [HeaderComponent]
})

export class AppModule { }
