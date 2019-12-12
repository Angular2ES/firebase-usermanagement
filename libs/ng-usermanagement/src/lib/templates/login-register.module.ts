import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegisterComponent } from './login-register.temp';
import { LoginProvidersModule } from '../login/login-providers.module';
import { MatTabsModule } from '@angular/material';
import { RegisterModule } from '../register/register.module';

@NgModule({
  declarations: [
    LoginRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginProvidersModule,
    RegisterModule,
    MatTabsModule,
  ],
  exports: [
    LoginRegisterComponent
  ],
})
export class LoginRegisterModule { }