import { AuthenticationService } from './auth.service'
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModuleConfig } from 'src/users-module-config';

@Injectable()
export class UserAuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private config: UserModuleConfig) {
  }

  // TODO give feedback to the user
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getUid().pipe(
      map(uid => !!uid),
      tap(isUser => {if(!isUser) this.router.navigate([this.config.redirectAfterLogout])})
      );
  }
}