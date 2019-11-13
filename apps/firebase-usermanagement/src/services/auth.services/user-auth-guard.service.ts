import { AuthenticationService } from '../auth.service'
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModuleConfig } from '../../users-module-config';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class UserAuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, 
    private router: Router, 
    private config: UserModuleConfig,
    private toaster: ToasterService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getUid().pipe(
      map(uid => !!uid),
      tap(isUser => {if(!isUser) {
        this.router.navigate([this.config.redirectAfterLogout])
        this.toaster.pop('warning', 'Sorry', 'Something went wrong please try again')
      }})
      );
  }
}