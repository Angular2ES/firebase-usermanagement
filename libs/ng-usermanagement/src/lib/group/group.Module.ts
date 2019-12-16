import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { SpinnerModule } from '../spinner/spinner.module';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { GroupCreateComponent } from './create-group/group-create.component';

@NgModule({
  declarations: [
    GroupSettingsComponent,
    GroupCreateComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  exports: [
    GroupSettingsComponent,
    GroupCreateComponent
  ]
})
export class GroupModule { }