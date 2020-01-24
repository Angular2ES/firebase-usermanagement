import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgSnackBarToken, SnackBarInterface } from '../../interfaces/snackbar-config.interface';
import { Group } from '../../models/group.model';
import { UserModel } from '../../models/user.model';
import { AdminAuthService } from '../../services/admin.auth.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'ng-group-users-settings',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})

export class GroupUsersSettingsComponent implements OnInit {
  
  @Input() currentGroup: Group;

  users$: Observable<UserModel[]>;
  userGroups: FormGroup;

  loading: boolean = false;

  constructor(
    private adminService: AdminAuthService,
    private groupService: GroupService, 
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface,
    private fb: FormBuilder) {
      
  }

  ngOnInit(): void {
    this.users$ = this.adminService.allUsers.pipe(
      tap(users => { 
        this.userGroups = this.fb.group({users: this.fb.array([])})
        users.forEach((user: UserModel) => {
        (this.userGroups.get('users') as FormArray).push(
          this.fb.group({
            user: user,
            role: ''
          })
        )
      } 
      )}),
      map(users => users)
    );
  }

  public isPartOfGroup(user: UserModel): boolean {
    if (!user.groups) return false;
    return user.groups.includes(this.currentGroup.groupId)     
  }

  public addUser(userId: string, role: string): Promise<void> {
    this.loading = true;
    return this.groupService.addUsersToGroup([userId], role, this.currentGroup.groupId)
    .then(() => {
      this.loading = false;
      this.snackBar.open('user has been added to the group', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  public removeUser(userId: string): Promise<void> {
    this.loading = true;
    return this.groupService.removeUsersFromGroup([userId], this.currentGroup)
    .then(() => {
      this.loading = false;
      this.snackBar.open('user has been removed from the group', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  private errorHandler(errorMessage: string){
    this.loading = false;
    this.snackBar.open(errorMessage, '', { duration: 2000 });
  }
}
