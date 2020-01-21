import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap, catchError, retry } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.user.pipe(
      switchMap(user => {
        if (user === null) { 
          this.snackBar.open('insufficient permission', '', { duration: 2000 }); 
          return of(false)
        }
        return from(user.getIdTokenResult()).pipe(
          map(idTokenResult => idTokenResult.claims.admin),
          tap((isAdmin: boolean) => { if (!isAdmin) throw new Error(); else return of(true) }),
          catchError((err, source) => { 
            this.snackBar.open('insufficient permission', '', { duration: 2000 }); 
            return of(false)
          }),
          )
        }),
      retry(2)
    )
  }
}

//this.snackBar.open('insufficient permission', '', { duration: 2000 }