import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  items: any[];

  constructor(private db: AngularFirestore, authService: AuthenticationService, userService: UserService, private router: Router) {
    if (userService.getUser() != null) {
      //todo do i need to subscribe here?
      userService.getUser().subscribe((res) => this.items = [res.name, res.uid, res.age]);
    }
    else this.items = null;
  }

}

