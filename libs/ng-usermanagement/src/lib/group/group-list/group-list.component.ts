import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../../models/group.model';
import { UserModel } from '../../models/user.model';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  @Input() extraGroupData: Object;
  
  groupList$: Observable<Observable<Group>[]>;
  groupSettingsActive: number = -1;
  
  constructor(public groupService: GroupService,
    private userService: UserService) {}
      
  ngOnInit(): void {
    this.groupList$ = this.userService.user$.pipe(
      map((user: UserModel) => {
        let groupList: Group[] = []
        let group: Observable<Group>[] = [];
        if(user.groups){
          user.groups.forEach(groupId => {
            group.push(this.groupService.getGroup(groupId).pipe(map(group => group)))
          })
        }
        return group;
      })
    )
  }

  toggleGroupSettings(index: number): void {
    if (this.groupSettingsActive === index) this.groupSettingsActive = -1;
    else this.groupSettingsActive = index;
  }
}
