import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuardService } from '../services/auth.services/user-auth-guard.service';
import { AppHomeComponent } from './app-home/app-home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { LoginTestComponent } from './login.test.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppHomeComponent, canActivate: [UserAuthGuardService]},
  { path: 'groupSettings', component: GroupSettingsComponent, canActivate: [UserAuthGuardService]},
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
