import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, from, of, asyncScheduler, defer, interval, race } from 'rxjs';
import { switchMap, map, tap, catchError, retry, mergeMap, distinctUntilChanged, debounce, flatMap } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {''
    return this.afAuth.user.pipe(
      distinctUntilChanged(),
      switchMap(user => {
        // Keeping the main observable stream alive by creating a disposable stream
        const disposableStream$ = of(user);
        return disposableStream$.pipe(
          // Timing of the observable can be an issue so we wait a second for the value stream to update
          debounce(user => { 
            if (user === null) {
              return interval(1000);
            } else {
              return interval(0);
            }
          }),
          flatMap((user) => {

            const notAnAdminPromise = Promise.resolve({ 
              claims: {
                admin: false
              }
            });

            // If the user is still null or the promise is rejected we return a admin user with the value of false 
            if (user === null) {
              return notAnAdminPromise;
            } else {
              return user.getIdTokenResult().catch(() => {
                return notAnAdminPromise;
              });
            }
          }),
          map((IdTokenResult) => { 
            // If the user is not an admin a snackbar is shown
            const isAdmin = IdTokenResult.claims.admin;
            if (!isAdmin) {
              this.snackBar.open('insufficient permission', '', { duration: 2000 }); 
            }
            return isAdmin;
          })
        )
      })
    )
  }
}