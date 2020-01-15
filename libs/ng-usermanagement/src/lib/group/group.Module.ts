import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { SpinnerModule } from '../spinner/spinner.module';
import { GroupSettingsComponent } from './group-settings/group-settings.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupUsersSettingsComponent } from './group-users/group-users.component';

@NgModule({
  declarations: [
    GroupSettingsComponent,
    GroupCreateComponent,
    GroupListComponent,
    GroupUsersSettingsComponent,
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
    GroupCreateComponent,
    GroupListComponent,
    GroupUsersSettingsComponent
  ]
})
export class GroupModule { }