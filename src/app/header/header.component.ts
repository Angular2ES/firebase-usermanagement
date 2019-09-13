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
    this.userService.getUser().subscribe(
      (user => this.router.navigate(['/groupSettings', user.groups[0]])) // TODO we send the user to settings of the first group. catch error if user doesn't have a group
    ).unsubscribe();
    //this.router.navigate(['/groupSettings', 'qrTURgfdXydpLvmcUq1N'])
  }

  public login(): void {
    this.navTo('/login');
  }

  navTo(ref: string): Promise<boolean> {
    return this.router.navigate([ref])
  }
}
