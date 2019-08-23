import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthenticationService, UserService]
})

export class LoginComponent {
  items: Observable<any[]>;

  constructor(db: AngularFirestore, private authService: AuthenticationService, private userService: UserService, private router: Router) {
    this.authService.logout();
  }

  loginUser(email: string, password: string) {
    this.authService.loginWithEmailAndPassword(email, password);

    this.isLogedIn();
  }

  isLogedIn() {
    var user = this.authService.getUser();
    console.log(user);
    if (user.email != null) {
      this.router.navigate(['home']);
    }

    //firebase.auth().onAuthStateChanged(function (user) {
    //  if (user) {
    //    console.log('user is active: ' + user);
    //    this.router.navigate('/home');
    //  } else {
    //    console.log('user is not logged in ' + user);
    //  }
    //})

    //if (this.userService.getUser() != null) {
    //  console.log('user is active: ' + this.userService.getUser());
    //  this.router.navigateByUrl('/home');
    //} else {
    //  console.log('user is not loged in ' + this.userService.getUser());
    //}
  }
}

