import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/services/validation.service';
import { GroupService } from 'src/services/group.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'group-container',
  template: `[{{ groupid | async | json }}] `
})
export class GroupContainer implements OnInit{
  @Input('init') groupid: string;
  
  groupData: FormGroup
  
  constructor(private groupService: GroupService) { }
  
  ngOnInit(): void {    
    this.groupService.getGroup(this.groupid).pipe(
      tap(group => console.log(group)),
      map(group => {
        this.groupData = new FormBuilder().group({
          groupId: this.groupid,
          groupName: group.groupName,
          users: group.users
        })        
      })
    )
    console.log(this.groupid);
  }
}