import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent {
  items: Observable<any[]>;

  constructor(db: AngularFirestore, private authService: AuthenticationService, private userService: UserService, private router: Router) {
  }

  async loginUser(email: string, password: string) {
    await this.authService.loginWithEmailAndPassword('test@123.nl', '123123');

    this.router.navigate(['/home']);
  }
}

