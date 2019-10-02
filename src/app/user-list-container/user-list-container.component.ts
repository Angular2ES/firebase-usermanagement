import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupSettingsComponent } from 'src/app/group-settings/group-settings.component';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { tap } from 'rxjs/operators';
import { Group } from 'src/models/group.model';

@Component({
  selector: 'user-list-container',
  template: 
  `<ul class="collection" *ngIf="currentUser$ | async">
    <li class="collection-item avatar">
      <span class="title">{{ userId }}</span>
      <p>{{ userName }}</p>

      <select id="select" style="display: block">
          <option value="{{userRolesKeys[j]}}" *ngFor="let option of userRolesKeys; let j = index">{{userRolesKeys[j]}}</option>
      </select>
      <a> <button class="material-icons" class="waves-effect waves-light btn" (click)="addUserToGroup()">Add this user to the group</button></a>

      <a class="secondary-content"> <button class="material-icons" class="waves-effect waves-light btn" (click)="groupSettings.removUser(userId)">Remove user</button></a>
    </li>
  </ul>`
})

export class UserListContainerComponent implements OnInit{
  @Input('user') user: FormGroup;
  @Input('groupSettingsInstance') groupSettings: GroupSettingsComponent;
  
  currentUser$: Observable<UserModel>;
  userName: string;
  userId: string;

  private userRoles: Group['users'] = {
    editors: [],
    readOnly: [],
    admins: []
  }

  userRolesKeys: string[] = Object.keys(this.userRoles);

  constructor(private router: Router,
    private userService: UserService){
    this.user = new FormBuilder().group({});
  }
  
  ngOnInit(): void {
    this.currentUser$ = this.userService.getUserWithId(this.user['userId']).pipe(
      tap(user => {this.userName = user.name; this.userId = user.uid}),
    )
  }

  addUserToGroup(){
    const sel = document.getElementById('select') as HTMLSelectElement;
    this.groupSettings.addUser(this.userId, sel.value)
  }

}