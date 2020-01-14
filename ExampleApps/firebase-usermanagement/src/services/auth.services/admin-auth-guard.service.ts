import { Injectable, Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AuthenticationService } from '../auth.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private userService: UserService, 
    private authService: AuthenticationService,
    private toasterService: ToasterService) {
  }

  // TODO change this from email check to admin check
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // return this.authService.getAuthState().pipe(
    //   map(user => user ? !!user.email : false),
    //   tap(isAdmin => {if (!isAdmin) this.popToast();})
    // )

    return true;

    // return this.userService.getUserFromDatabase().pipe(
    //   map(data => data.admin)
    // )
  }
//this.router.navigate([this.config.redirectAfterLogout]);
  popToast(){
    this.toasterService.pop('failed', 'failed to go to this page', '')
  }
}