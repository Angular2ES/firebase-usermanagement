import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { RegisterComponent } from './register.component';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ValidationMessageModule,
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }