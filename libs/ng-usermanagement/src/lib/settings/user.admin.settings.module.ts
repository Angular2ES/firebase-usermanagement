import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatButtonModule, MatInputModule } from '@angular/material';
import { AdminSettingsComponent } from './admin/admin.settings.Component';
import { UserSettingsComponent } from './user/user.settings.Component';
import { SpinnerModule } from '../spinner/spinner.module';

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
    MatButtonModule,
    MatInputModule,
    SpinnerModule,
  ],
  exports: [
    UserSettingsComponent,
    AdminSettingsComponent
  ],
})
export class UserAdminSettingsModule { }