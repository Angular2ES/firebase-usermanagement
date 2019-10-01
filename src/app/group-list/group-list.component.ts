import { Component } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
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
        'groupId': this.fb.array([])
      })
      
      this.groupList$ = this.userService.getCurrentUser().pipe(
        tap((user: UserModel) => {

          const control = <FormArray>this.formData.controls['groupId'];
          control.clear();
          if(user.groups){
            user.groups.forEach(groupId => {
              control.push(this.createFormOfGroup(groupId))
            })
          }
        }),
        tap((user: UserModel) => this.uid = user.uid),
        map(user => user.groups)
      )
  }

  get formGroup(): FormArray {
    return this.formData.get('groupId') as FormArray;
  }

  private createFormOfGroup(groupId: string): FormGroup{
    return this.fb.group({
      groupId: groupId, 
    })
  }

  public createGroup(){
    this.groupService.createGroup(this.uid, 'a new groupName')
  }

}
