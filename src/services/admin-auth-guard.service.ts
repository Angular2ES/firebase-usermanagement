import { Injectable, Component } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Injectable()
export class AdminAuthGuardService implements CanActivate {
  public toasterConfig: ToasterConfig = 
    new ToasterConfig({
        showCloseButton: true, 
        tapToDismiss: false, 
        timeout: 0
    });

  constructor(private userService: UserService, 
    private toasterService: ToasterService) {
  }

  // TODO change this from email check to admin check
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUser().pipe(
      map(user => user ? !!user.email : false),
      tap(isAdmin => {if (!isAdmin) this.popToast();})
    )
  }
//this.router.navigate([this.config.redirectAfterLogout]);
  popToast(){
    this.toasterService.pop('failed', 'failed to go to this page', '')
  }
}