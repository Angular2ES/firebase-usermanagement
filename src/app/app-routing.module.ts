import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserSettingsTestComponent } from './user.settings.test.component';

// canActivate
import { UserAuthGuardService } from '../services/auth.services/user-auth-guard.service';
import { AdminAuthGuardService } from 'src/services/auth.services/admin-auth-guard.service';
import { GroupSettingsComponent } from './group-settings/group-settings.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppComponent, canActivate: [UserAuthGuardService]},
  { path: 'settings/:uid', component: UserSettingsTestComponent, canActivate: [UserAuthGuardService, AdminAuthGuardService] },
  { path: 'groupSettings/:id', component: GroupSettingsComponent, canActivate: [UserAuthGuardService]}, // TODO add authGaurd for only user within the group or only admins of this group
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
