import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group.model';
import { GroupService } from 'src/services/group.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { UserModel } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { group } from '@angular/animations';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, CanActivate {

  currentGroup$: Observable<Group>;

  private curGroupForm: FormGroup;
  
  constructor(private groupService: GroupService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder) {

    this.curGroupForm = this.formBuilder.group ({
      'groupId' : new FormControl() ,
    });
    this.currentGroup$ = this.route.params.pipe(
      tap (params => this.curGroupForm.patchValue({groupId: params['id']})),
      switchMap(params => this.groupService.getGroup(params['id'])),
    )
  }
  // TODO give feedback to the user
  canActivate(): Observable<boolean> {
    return new Observable<true>();
    // TODO who has permission to edit the settings of the group
    return this.route.params.pipe(
      switchMap(params => this.groupService.getGroupPermissions(params['id'])),
      switchMap(perm => this.IsCurUserAdmin(perm)),
    )
  }

  private IsCurUserAdmin(permissions: any): Observable<boolean> {
    return this.userService.getUser().pipe(
      tap(u => console.log(permissions.admin[0])),
      map(user => user == permissions.admin[0]) // TODO we only check the first admin
    )
  }

  public changeName(name: string): void {
    const groupData = {
      groupName: name
    }
    this.groupService.updateGroupData(this.curGroupForm.value.groupId, groupData)
  }

  public deleteGroup(): void {
    this.groupService.deleteGroup(this.curGroupForm.value.groupId);
  }

  ngOnInit() {
    // console.log(document.)
  }

}
