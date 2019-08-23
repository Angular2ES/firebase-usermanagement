import { Component, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AuthenticationService, UserService]
})

export class AppComponent {
  items: Observable<any[]>;

  constructor(private db: AngularFirestore, authService: AuthenticationService, private userService: UserService, private router: Router) {
    //authService.logout()
    //  .then(() => this.router.navigateByUrl('/login'));
    // this.items = authService.authState$.
    // this.items = db.collection("/Users", ref => ref.where('naam', '==', "Peet")).valueChanges();
    // , ref => ref.where('naam', '==', "Peet")
  }

  ngOnInit() {
    this.items = this.db.collection("/Users", ref => ref.where('naam', '==', "Peet")).valueChanges();
  }
}

