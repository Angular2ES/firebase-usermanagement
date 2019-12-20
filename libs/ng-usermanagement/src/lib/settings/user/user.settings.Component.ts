import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'ng-user-settings',
  templateUrl: './user.settings.component.html',
  styleUrls: ['./user.settings.component.css'],
})

export class UserSettingsComponent {
  /**
   * redirect the user on a succesful logout
   */
  @Input() redirectOnLogout: string;

  /**
   * Add extra data to the database on update the user data
   */
  @Input() addExtraData: any = {};
  
  public currentUser$: Observable<UserModel>
  public loading: boolean = false;
  
  public userSettingsForm: FormGroup = this.formBuilder.group({
    uid: new FormControl(),
    displayName: new FormControl(),
    email: new FormControl()
  });

  constructor(
    private authService: AuthenticationService, 
    public userService: UserService, 
    public formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar)
    {
      this.currentUser$ = this.userService.user$.pipe(
        tap(user => { this.userSettingsForm.patchValue(user)})
      )
    }

  public updateUserData(data: any): Promise<void> {
    this.loading = true;
    return this.userService.updateUser(this.userSettingsForm.controls['uid'].value, { ...data, ...this.addExtraData})
      .then(() => { this.loading = false; this.snackBarMessage('update succesful') })
      .catch((e) => this.errorHandler(e));
  }

  public async logout(): Promise<void> {
    this.loading = true;
    try {
      await this.authService.logout();
      this.loading = false;
      this.snackBarMessage('logout succesfull')
      if (this.redirectOnLogout != null) await this.router.navigate([this.redirectOnLogout])
      return Promise.resolve()
    } catch(err) {
      this.loading = false
      this.snackBarMessage(err.message);
      return Promise.reject(err);
    }
  }

  private snackBarMessage(message: string): void {
    this.snackBar.open(message, '', { duration: 2000 })
  }

  private errorHandler(error: any): void {
    this.loading = false;
    this.snackBarMessage(error.message);
  }
}