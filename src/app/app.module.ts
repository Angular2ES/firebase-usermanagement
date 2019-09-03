import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-components/email-password-login.component';
import { HeaderComponent } from './components/header.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';

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
import { LoginHelper } from './login-components/login-helper.service'
// modules
import { AppRoutingModule } from './app-routing.module';
import { MaterializeModule } from 'angular2-materialize';
import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { LoginEmailComponent } from './login-email/login-email.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { ToasterService, ToasterModule } from 'angular2-toaster';


const userModuleConfig: UserModuleConfig = {
  loginRedirectUrl: environment.loginRedirectUrl,
  redirectAfterLogin: '/home',
  firebaseCfg: environment.firebase
};

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    HeaderComponent,
    UserSettingsComponent,
    
    LoginTestComponent,
    
    LoginEmailComponent,
    
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterializeModule,
    ToasterModule.forRoot(), // TODO remove or use it somewhere (cur we aren't using it)
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, 
    StorageModule.forRoot({ IDBNoWrap: true }), // imports firebase/auth, only needed for auth features,
    //AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthenticationService, UserService, LoginHelper, ToasterService,
    { provide: UserModuleConfig, useValue: userModuleConfig }
  ],
  bootstrap: [HeaderComponent]
})

export class AppModule { }
