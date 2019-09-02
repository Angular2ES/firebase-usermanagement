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

  //TODO create generic error catcher
  public async loginWithEmailPassword(email: string, password: string): Promise<void> {
    try{
      await this.authService.loginWithEmailAndPassword('test@123.nl', '123123');
      this.router.navigate(['/home']);
    } catch (e){
        alert(e.message);
    }
  }
}

