import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group.model';
import { GroupService } from 'src/services/group.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})

export class GroupSettingsComponent implements CanActivate {

  currentGroup$: Observable<Group>;
  private curGroupForm: FormGroup;

  userOptions = [
     'readOnly',
     'editores',
     'admins'
  ]

  curUserForm: FormGroup;
  userList$: Observable<string[]>;

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

    this.curUserForm = this.formBuilder.group ({
      'userId': this.formBuilder.array([])
    })
    this.userList$ = this.userService.getAllUserList().pipe(
      map((user: firestore.QuerySnapshot) => {
        const userList: string[] = [];
        const control = <FormArray>this.curUserForm.controls['userId'];
        control.clear();
        if (user){
          user.forEach(data => {
            control.push(this.createFormOfUser(data.id))
            userList.push(data.id);
          })
        }
        return userList;
      }),
    )
  }
    
  // TODO give feedback to the user
  canActivate(): Observable<boolean> {
    return new Observable<true>();
    // TODO who has permission to edit the settings of the group
    // return this.route.params.pipe(
    //   switchMap(params => this.groupService.getGroupPermissions(params['id'])),
    //   switchMap(perm => this.IsCurUserAdmin(perm)),
    // }
  }

  private IsCurUserAdmin(permissions: any): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      tap(u => console.log(permissions.admin[0])),
      map(user => user == permissions.admin[0]) // TODO we only check the first admin
    )
  }
  
  get userForm(): FormArray{
    return this.curUserForm.get('userId') as FormArray
  }

  private createFormOfUser(userId: string): FormGroup {
    return this.formBuilder.group({
      userId: userId
    })
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

  public addUser(userId: string, role: string): void {
    this.groupService.addUsersToGroup([userId], role, this.curGroupForm.value.groupId);
  }

  public removeUser(userId: string): void {
    this.groupService.removeUsersFromGroup([userId], this.curGroupForm.value.groupId);
  }
}
