import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/services/group.service';
import { Observable } from 'rxjs';
import { Group } from 'src/models/group.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'group-list-container',
  template: `
  <ul class="collection" *ngIf="currentGroup$ | async">
    <li class="collection-item avatar">
      <span class="title">{{ groupName }}</span>
      <p>{{ groupId }}</p>

      <a class="secondary-content"> <button class="material-icons" class="waves-effect waves-light btn" (click)="groupSettings(group.groupId)">Settings</button></a>
    </li>
  </ul>`
})
export class GroupListContainerComponent implements OnInit{
  @Input('group') group: FormGroup;

  currentGroup$: Observable<Group>;
  groupName: string;
  groupId: string;
  
  constructor(private router: Router,
    private groupService: GroupService){

    this.group = new FormBuilder().group({});
  }
  
  ngOnInit(): void {
    this.currentGroup$ = this.groupService.getGroup(this.group['groupId']).pipe(
      tap(group => {this.groupName = group.groupName; this.groupId = group.groupId}),
    )
  }

  groupSettings(groupId: string){
    this.router.navigate(['groupSettings', groupId])
  }
}