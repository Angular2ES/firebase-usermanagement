import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  template: ``, 
})

export class LoginComponent {

  constructor(db: AngularFirestore, private authService: AuthenticationService, private userService: UserService, private router: Router) {
  }

  public async loginUser(email: string, password: string): Promise<void> {
    await this.authService.loginWithEmailAndPassword('test@123.nl', '123123');

    this.router.navigate(['/home']);
  }
}

