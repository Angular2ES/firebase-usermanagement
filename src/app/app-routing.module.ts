import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserSettingsTestComponent } from './user.settings.test.component';

// canActivate
import { UserAuthGuardService } from '../services/user-auth-guard.service';
import { AdminAuthGuardService } from 'src/services/admin-auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppComponent, canActivate: [UserAuthGuardService]},
  { path: 'settings/:uid', component: UserSettingsTestComponent, canActivate: [UserAuthGuardService, AdminAuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      )
  ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule { }
