import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginTestComponent } from './login.test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserSettingsTestComponent } from './user.settings.test.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginTestComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'home', component: AppComponent },
  { path: 'settings/:uid', component: UserSettingsTestComponent }
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
