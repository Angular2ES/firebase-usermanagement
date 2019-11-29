import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { AdminSettingsComponent } from './admin/admin.settings.Component';
import { UserSettingsComponent } from './user/user.settings.Component';

@NgModule({
  declarations: [
    UserSettingsComponent,
    AdminSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  exports: [
    UserSettingsComponent,
    AdminSettingsComponent
  ],
})
export class UserAdminSettingsModule { }