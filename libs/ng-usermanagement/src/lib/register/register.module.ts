import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { SpinnerModule } from '../spinner/spinner.module';
import { RegisterComponent } from './register.component';
import { ValidationMessageModule } from '../validation-message/validation-message.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule,
    MatProgressSpinnerModule,
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }