import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { AdminSettingsComponent } from './admin.settings.Component';
import { SpinnerModule } from '../../spinner/spinner.module';

@NgModule({
  declarations: [
    AdminSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    SpinnerModule,
  ],
  exports: [
    AdminSettingsComponent
  ],
})
export class AdminSettingsModule { }