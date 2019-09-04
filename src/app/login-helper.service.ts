import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Component, Injectable } from '@angular/core';

@Injectable()
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