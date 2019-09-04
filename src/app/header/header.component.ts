import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'header.component.html',
})

export class HeaderComponent {
  constructor(private authService: AuthenticationService, private userService: UserService, private router: Router) { }

// TODO this is temp, just to make the front-end work
  async logout(): Promise<void> {
    await this.authService.logout('/login');
  }

  async settings(): Promise<void>{
    //await this.authService.getUid().pipe(tap(id => console.log(id)), map(id => id ? this.navTo(id) : null))
    this.navTo('1');
  }

  navTo(userId: string): string {
    this.router.navigate(['/settings', userId])
    return userId;
  }
}
