import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { SpinnerModule } from '../spinner/spinner.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    MatProgressSpinnerModule,
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }