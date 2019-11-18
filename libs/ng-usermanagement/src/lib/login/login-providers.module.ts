import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { LoginEmailPasswordComponent } from './providers/login-email-password/login-email-password.component';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    LoginEmailPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    MatSnackBarModule,
  ],
  exports: [
    LoginEmailPasswordComponent,
    LoginGoogleComponent
  ],
})
export class LoginProvidersModule { }