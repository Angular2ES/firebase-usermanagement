import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { UserSettingsComponent } from './user.settings.Component';
import { SpinnerModule } from '../../spinner/spinner.module';

@NgModule({
  declarations: [
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SpinnerModule,
  ],
  exports: [
    UserSettingsComponent
  ],
})
export class UserSettingsModule { }