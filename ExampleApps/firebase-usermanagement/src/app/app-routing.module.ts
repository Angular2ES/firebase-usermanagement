import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { LoginTestComponent } from './login.test.component';
import { AdminSettingsComponent } from './admin-settings.component';
import { AdminAuthGuardService } from 'libs/ng-usermanagement/src/lib/guards/admin-auth-guard.service';
import { UserAuthGuardService } from 'libs/ng-usermanagement/src/lib/guards/user-auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppHomeComponent, canActivate: [UserAuthGuardService]},
  { path: 'groupSettings', component: GroupSettingsComponent, canActivate: [UserAuthGuardService]},
  { path: 'adminSettings', component: AdminSettingsComponent, canActivate: [UserAuthGuardService, AdminAuthGuardService]},
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
