import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from 'src/models/user.model';
import { GroupContainer } from './group-container/group-container';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groupList$: Observable<string[]>;
  userSub: Subscription; // TODO remove this
  uid: string;
  
  constructor(private groupService: GroupService,
    private userService: UserService) {
      
      this.groupList$ = userService.getUser().pipe(
        tap((user: UserModel) => {
          user.groups.forEach(element => {
            const container = document.createElement('group-container')
            container.setAttribute('init', element);
            document.getElementById('slideContainer').appendChild(container)
          })
        }),
        map(user => user.groups)
        )
      }
      
  ngOnInit() {
    // TODO remove subscribe
    this.userSub = this.userService.getUser().subscribe((user) => this.uid = user.uid);
  }
  
  public createGroup(){
    this.groupService.createGroup(this.uid, 'a new groupName')
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
