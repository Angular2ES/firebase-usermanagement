import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'ng-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.css'],
})

export class AdminPopupComponent implements AfterViewInit, OnDestroy {
  
  /**
   * Current user
   */
  public currentUser$: Observable<UserModel>;
  /**
   * The email of the current user
   */
  public userEmail: string;
  
  constructor(
    private userService: UserService,
    private authService: AuthenticationService){
    this.currentUser$ = this.userService.user$.pipe(
      tap(user => this.userEmail = user.email),
      map(user => user)
      );
    }
    
  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  /**
   * return the admin to his account
   */
  public returnToAdminAccount(): void {
    this.authService.logout();
  }

}