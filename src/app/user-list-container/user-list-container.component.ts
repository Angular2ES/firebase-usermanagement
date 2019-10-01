import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupSettingsComponent } from 'src/app/group-settings/group-settings.component';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'user-list-container',
  template: 
  `<div *ngIf="currentUser$ | async" class="col-md-6">
    <button class="waves-effect waves-light btn" (click)="groupSettings.addUser(userId)">Add user : {{userName}}</button>
    <button class="waves-effect waves-light btn" (click)="groupSettings.removeUser(userId)">Remove user : {{userName}}</button>
  </div>`
})

export class UserListContainerComponent implements OnInit{
  @Input('user') user: FormGroup;
  @Input('groupSettingsInstance') groupSettings: GroupSettingsComponent;
  
  currentUser$: Observable<UserModel>;
  userName: string;
  userId: string;
  
  constructor(private router: Router,
    private userService: UserService){
    this.user = new FormBuilder().group({});
  }
  
  ngOnInit(): void {
    this.currentUser$ = this.userService.getUserWithId(this.user['userId']).pipe(
      tap(user => {this.userName = user.name; this.userId = user.uid}),
    )
  }

}