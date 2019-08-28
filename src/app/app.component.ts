import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit, OnDestroy {

  items: Observable<UserModel>;

  constructor(private db: AngularFirestore, authService: AuthenticationService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.items = this.userService.getUser().pipe(
      filter(u => !!u)
    );

  }

  ngOnDestroy(): void {
  }
}

