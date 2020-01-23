import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { LoginEmailPasswordComponent } from './providers/login-email-password/login-email-password.component';
import { LoginGoogleComponent } from './providers/login-google/login-google.component';
import { MatSnackBarModule, MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    LoginEmailPasswordComponent,
    LoginGoogleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    LoginEmailPasswordComponent,
    LoginGoogleComponent
  ],
})
export class LoginProvidersModule { }