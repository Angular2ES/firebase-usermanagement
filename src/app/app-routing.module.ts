import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login-components/email-password-login.component';
import { LoginTestComponent } from './login.test.component';
import { UserSettingsComponent } from './user-settings/user.settings.Component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'home', component: AppComponent },
  { path: 'settings/:uid', component: UserSettingsComponent }
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
