import { Component } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, NavigationStart, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  
  groupList$: Observable<string[]>;
  uid: string;

  formData: FormGroup;

  pageIndex: number = 0;
  totalPageItems: number = 6; //TODO 

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

  updatePageIndex(index: number): void {
    this.pageIndex = index;
  }

  get pagedItems(): string[] {
    const newArr = []
    const array = this.formData.get('groupId') as FormArray;
    for(let i = 0; i < this.totalPageItems; i++){
      const page = array.value[(this.pageIndex * this.totalPageItems) + i];
      if (page) newArr.push(page)
    }
    return newArr;
  }

  formGroupPagination(itemCount: number): any[] {
    const array = this.formData.get('groupId') as FormArray
    return new Array(Math.ceil(array.length / itemCount))
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
