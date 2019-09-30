import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/services/group.service';
import { GroupSettingsComponent } from 'src/app/group-settings/group-settings.component';

@Component({
  selector: 'user-list-container',
  template: 
  `<div class="col-md-6">
    <button class="waves-effect waves-light btn" (click)="groupSettings.addUser(user.uid)">Add user : {{user.uid}}</button>
    <button class="waves-effect waves-light btn" (click)="groupSettings.removeUser(user.uid)">Remove user : {{user.uid}}</button>
  </div>`
})

export class UserListContainerComponent {
  @Input('user') user: FormGroup;
  @Input('groupSettingsInstance') groupSettings: GroupSettingsComponent;

  // TODO get name of user
  
  constructor(private router: Router){
    this.user = new FormBuilder().group({});
  }
}