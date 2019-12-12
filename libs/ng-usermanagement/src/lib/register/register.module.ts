import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '../spinner/spinner.module';
import { ValidationMessageModule } from '../validation-message/validation-message.module';
import { RegisterComponent } from './register.component';

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
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }