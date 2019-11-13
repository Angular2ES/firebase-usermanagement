import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginHelper{
  constructor(private authService: AuthenticationService, private userService: UserService){
  }

  getAuthService(): AuthenticationService{
    return this.authService;
  }

  getUserService(): UserService {
    return this.userService;
  }
}