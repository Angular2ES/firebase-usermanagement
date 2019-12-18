import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group.model';

@Component({
  selector: 'ng-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})

export class GroupSettingsComponent {
  
  @Input() extraGroupData: any;

  currentGroup$: Observable<Group>;
  private curGroupForm: FormGroup;

  loading: boolean = false;

  constructor(private groupService: GroupService, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.curGroupForm = this.formBuilder.group ({
      groupId : [],
      users: []
    });
    this.currentGroup$ = this.route.params.pipe(
      tap (params => this.curGroupForm.patchValue({groupId: params['id']})),
      switchMap(params => this.groupService.getGroup(params['id'])),
    )
  }
  
  public updateGroupData(groupData: any): Promise<void> {
    this.loading = true;
    if (this.extraGroupData != null) groupData = { ...groupData, ...this.extraGroupData }
    return this.groupService.updateGroupData(this.curGroupForm.value.groupId, groupData)
    .then(() => {
      this.loading = false;
      this.snackBar.open('update succesful', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  public deleteGroup(): Promise<void> {
    this.loading = true;
    return this.groupService.deleteGroup(this.curGroupForm.value.groupId)
    .then(() => {
      this.loading = false;
      this.snackBar.open('delete succesful', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  public addUser(userId: string, role: string): Promise<void> {
    this.loading = true;
    return this.groupService.addUsersToGroup([userId], role, this.curGroupForm.value.groupId)
    .then(() => {
      this.loading = false;
      this.snackBar.open('user has been added to the group', '', { duration: 2000 })
    })
    .catch((err) => this.errorHandler(err.message));
  }

  public removeUser(userId: string): Promise<void> {
    this.loading = true;
    return this.groupService.removeUsersFromGroup([userId], this.curGroupForm.value)
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
