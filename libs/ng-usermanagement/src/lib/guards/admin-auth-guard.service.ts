import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.user.pipe(
      switchMap(async user => {
        try {
          const idTokenResult = await user.getIdTokenResult()
          if (idTokenResult.claims.admin){
            return true;
          } else {
            this.snackBar.open('insufficient permission', '', { duration: 2000 })
            return false;
          }
        }
        catch {
          this.snackBar.open('insufficient permission', '', { duration: 2000 })
          return false;
        }
      })
    )
  }
}