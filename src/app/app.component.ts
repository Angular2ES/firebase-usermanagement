import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { error } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {
  items: any[];

  constructor(private db: AngularFirestore, authService: AuthenticationService, userService: UserService, private router: Router) {
    console.log('this is home page');
    if (userService.getUser() != null) userService.getUser().subscribe((res) => this.items = [res.name, res.uid, res.age]);
    else this.items = null;
      //if (userService.getUser() != null) this.items = this.db.collection("/Users", ref => ref.where('naam', '==', "Peet")).valueChanges();
  }

}

