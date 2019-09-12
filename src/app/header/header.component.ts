import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit{
  constructor(private authService: AuthenticationService, private userService: UserService, private router: Router) { 
    // this.authService.getAuthState().pipe(tap((data) => data.uid ? this.navTo('/home') : this.navTo('/login')));
  }
  
  ngOnInit(): void {
    console.log(document.URL);
    //TODO fix this if we still need it
    // if (document.URL == 'http://localhost:4200/login') document.getElementById('nav').style.display = 'none';
    // else document.getElementById('nav').style.display = 'block';
  }

  // TODO this is temp, just to make the front-end work
  async logout(): Promise<void> {
    await this.authService.logout();
  }

  public settings(): void{
    //await this.authService.getUid().pipe(tap(id => console.log(id)), map(id => id ? this.navTo(id) : null))
    this.navTo('/settings/1');
  }

  public login(): void {
    this.navTo('/login');
  }

  navTo(ref: string): Promise<boolean> {
    return this.router.navigate([ref])
  }
}
