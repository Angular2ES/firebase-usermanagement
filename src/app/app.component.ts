import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { filter, tap } from 'rxjs/operators';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-home ',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit {

  user$: Observable<UserModel>;
  uid: string;

  constructor(private userService: UserService,
    private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser().pipe(
      filter((u: UserModel) => !!u),
      tap(user => this.uid = user.uid)
    );
  }
}

