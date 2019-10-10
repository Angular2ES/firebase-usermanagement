import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { UserModel } from 'src/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit{

  constructor(private authService: AuthenticationService, private userService: UserService) { 
  }
  
  ngOnInit(): void {
    //TODO fix this if we still need it
    // if (document.URL == 'http://localhost:4200/login') document.getElementById('nav').style.display = 'none';
    // else document.getElementById('nav').style.display = 'block';
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
