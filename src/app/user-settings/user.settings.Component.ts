import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { map, tap } from 'rxjs/operators';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user.settings.component.html',
  styleUrls: ['./user.settings.component.css'],
})

export class UserSettingsComponent {
  private currentUser$: Observable<UserModel>;

  constructor(private db: AngularFirestore, private authService: AuthenticationService, private userService: UserService){
    this.currentUser$ = this.userService.getUser();
  }

  public async updateUserAge(data): Promise<void>{
    this.currentUser$.pipe(tap(user => console.log(user)), map(user => user ? user.age = data : null));
    this.userService.updateUser(data);
  }
}