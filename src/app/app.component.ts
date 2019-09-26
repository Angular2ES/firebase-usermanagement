import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Observable, Subscribable, Subscriber, Subscription } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { filter, tap } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { GroupService } from 'src/services/group.service';
import { Group } from 'src/models/group.model';

@Component({
  selector: 'app-home ',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<UserModel>;
  userSub: Subscription; // TODO remove this
  uid: string;

  constructor(private userService: UserService,
    private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser().pipe(
      // tap(u => this.groupService.createGroup(u.uid, 'this is a name')),
      filter((u: UserModel) => !!u)
    );
    //TODO remove after bug fixing
    this.userSub = this.user$.subscribe((user) => this.uid = user.uid);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  createGroup(){
    this.groupService.createGroup(this.uid, 'a new groupName')
  }
}

