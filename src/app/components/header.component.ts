import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'header.component.html',
})

export class HeaderComponent {
  constructor(private authService: AuthenticationService, private userService: UserService, private router: Router) { }

// TODO this is temp, just to make the front-end work
  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
