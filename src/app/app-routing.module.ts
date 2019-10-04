import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app-main/app.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { UserSettingsTestComponent } from './user.settings.test.component';

// canActivate
import { UserAuthGuardService } from '../services/auth.services/user-auth-guard.service';
import { AdminAuthGuardService } from 'src/services/auth.services/admin-auth-guard.service';
import { GroupAdminAuthGuardService } from 'src/services/auth.services/groupAdmin-auth-gaurd.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppComponent, canActivate: [UserAuthGuardService]},
  { path: 'userSettings', component: UserSettingsTestComponent, canActivate: [UserAuthGuardService, AdminAuthGuardService] },
  { path: 'groupSettings/:id', component: GroupSettingsComponent, canActivate: [UserAuthGuardService, GroupAdminAuthGuardService]}, // TODO add authGaurd for only user within the group or only admins of this group
  { path: 'groupList', component: GroupListComponent, canActivate: [UserAuthGuardService]},
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
