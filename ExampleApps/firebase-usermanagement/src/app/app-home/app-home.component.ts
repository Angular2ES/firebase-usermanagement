import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { filter, tap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home ',
  templateUrl: 'app-home.component.html',
  styleUrls: ['app-home.component.css'],
})

export class AppHomeComponent implements OnInit {

  user$: Observable<UserModel>;
  uid: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser().pipe(
      filter((u: UserModel) => !!u),
      tap(user => this.uid = user.uid)
    );
  }
}

