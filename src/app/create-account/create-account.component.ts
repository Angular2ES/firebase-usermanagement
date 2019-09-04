import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  constructor( private userService: UserService, private router: Router) { }

  createAccount(email: string): void {
    // TODO check if email exist if so return 
    // make it so the user has to change password before going to /home
    // create user within db
    this.userService.createUser(email).then(
      // () => this.router.navigate(['/home'])
    ).catch((err) => console.log('error code: ' + err))
  }

}
