import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'ng-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})

export class GroupSettingsComponent {
  
  @Input() extraGroupData: Object;
  @Input() currentGroup: Group;

  loading: boolean = false;

  constructor(private groupService: GroupService, 
    private snackBar: MatSnackBar) {
  }
  
  public updateGroupData(groupData: any): Promise<void> {
    this.loading = true;
    groupData = { ...groupData, ...this.extraGroupData }
    return this.groupService.updateGroupData(this.currentGroup.groupId, groupData)
    .then(() => {
      this.loading = false;
      this.snackBar.open('update succesful', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  public deleteGroup(): Promise<void> {
    this.loading = true;
    return this.groupService.deleteGroup(this.currentGroup.groupId)
    .then(() => {
      this.loading = false;
      this.snackBar.open('delete succesful', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
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
