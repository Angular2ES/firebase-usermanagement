import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private snackBar: MatSnackBar) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return firebase.auth().currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      if (idTokenResult.claims.admin){
        return true;
      } else {
        this.snackBar.open('insufficient permission', '', { duration: 2000 })
        return false;
      }
    })
  }
}