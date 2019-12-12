import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAdminAuthGuardService } from '../services/auth.services/groupAdmin-auth-gaurd.service';
import { UserAuthGuardService } from '../services/auth.services/user-auth-guard.service';
import { AppHomeComponent } from './app-home/app-home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { LoginTestComponent } from './login.test.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppHomeComponent, canActivate: [UserAuthGuardService]},
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
