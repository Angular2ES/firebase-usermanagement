import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from 'src/models/user.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  
  groupList$: Observable<string[]>;
  uid: string;

  formData: FormGroup;

  constructor(private groupService: GroupService,
    private userService: UserService,
    private fb: FormBuilder) {
      
      this.formData = this.fb.group({
        groups: this.fb.array([])
      })
      this.groupList$ = userService.getUser().pipe(
        tap((user: UserModel) => {

          const control = <FormArray>this.formData.controls['groups'];
          control.clear();
          user.groups.forEach(groupId => {
            control.push(this.createFormOfGroup(groupId))
          })
        }),
        tap((user: UserModel) => this.uid = user.uid),
        map(user => user.groups)
      )
  }

  get contactFormGroup() {
    return this.formData.get('groups') as FormArray;
  }

  private createFormOfGroup(groupId: string): FormGroup{
    // TODO get the rest of the data with groupService
    const newGroup = this.fb.group({
      groupId: groupId, 
      groupName: null, 
      users: null
    })
    return newGroup
  }

  public createGroup(){
    this.groupService.createGroup(this.uid, 'a new groupName')
  }

}
