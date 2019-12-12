import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatButtonModule, MatInputModule } from '@angular/material';
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
    MatButtonModule,
    MatInputModule,
    SpinnerModule,
  ],
  exports: [
    UserSettingsComponent
  ],
})
export class UserSettingsModule { }