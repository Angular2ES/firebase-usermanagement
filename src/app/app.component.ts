import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { filter } from 'rxjs/operators';
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-home ',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {

  items: Observable<UserModel>;

  constructor(private userService: UserService,
    private toasterService: ToasterService) {
  }

  ngOnInit(): void {
    this.items = this.userService.getUser().pipe(
      filter(u => !!u)
    );
  }

  ngOnDestroy(): void {
  }
}

