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
  /**
   * Add extra group data on updating the group settings
   */
  @Input() extraGroupData: Object;
  
  /**
   * A list of groups
   */
  groupList$: Observable<Observable<Group>[]>;

  /**
   * An iterator of the current settings that are open
   */
  groupSettingsActive: number = -1;
  
  constructor(public groupService: GroupService,
    private userService: UserService) {}
      
  /**
   * Creating the group list
   */
  ngOnInit(): void {
    this.groupList$ = this.userService.user$.pipe(
      map((user: UserModel) => {
        let groups: Observable<Group>[] = [];
        if(user.groups){
          user.groups.forEach(groupId => {
            groups.push(this.groupService.getGroup(groupId).pipe(map(group => group)))
          })
        }
        return groups;
      })
    )
  }

  /**
   * Toggle the selected group settings
   * @param index 
   */
  toggleGroupSettings(index: number): void {
    if (this.groupSettingsActive === index) this.groupSettingsActive = -1;
    else this.groupSettingsActive = index;
  }
}
