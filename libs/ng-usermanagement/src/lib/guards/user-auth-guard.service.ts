import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UserAuthGuardService implements CanActivate {

  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar) {
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