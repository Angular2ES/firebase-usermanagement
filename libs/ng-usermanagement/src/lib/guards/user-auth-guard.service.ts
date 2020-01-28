import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgSnackBarToken, SnackBarInterface } from '../interfaces/snackbar-config.interface';
import { UserService } from '../services/user.service';

@Injectable()
export class UserAuthGuardService implements CanActivate {

  constructor(
    private userService: UserService, 
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.user$.pipe(
      map(user => !!user),
      tap(isUser => {
        if(!isUser) {
          this.snackBar.open('You are not logged in', '', { duration: 2000 })
        }
      })
    );
  }
}