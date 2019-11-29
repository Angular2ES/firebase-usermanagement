import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-user-settings',
  templateUrl: './user.settings.component.html',
  styleUrls: ['./user.settings.component.css'],
})

export class UserSettingsComponent {
  
  @Input() redirectOnLogout: string;
  @Input('extraData') addExtraData: any = {};
  
  public currentUser$: Observable<any>
  
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
      this. currentUser$ = this.userService.getCurrentUser().pipe(
        tap(user => { this.userSettingsForm.patchValue(user)})
      )
    }

  async updateUserData(data: any): Promise<any> {
    return this.userService.updateUser(this.userSettingsForm.controls['uid'].value, { ...data, ...this.addExtraData})
      .then(() => this.snackBar.open('update succesfull', '', { duration: 2000 }))
      .catch(e => this.errorHandler(e));
  }

  async sendResetPasswordMail(): Promise<any> {
    return this.authService.sendChangePasswordLink(this.userSettingsForm.controls['email'].value)
      .then(() => this.snackBar.open('email has been send', '', { duration: 2000 })).then(() => null)
      .catch(e => this.errorHandler(e))
    }

  async deleteAccount(): Promise<any> {
    return this.userService.deleteUserFromDatabase(this.userSettingsForm.controls['uid'].value)
      .then(() => { this.authService.deleteAccount()
        .then(() => this.snackBar.open('account has been deleted', '', { duration: 2000 }))
        .then(() => this.redirectOnLogout ? this.router.navigate([this.redirectOnLogout]) : null)
        .catch(e => this.errorHandler(e))
      });
  }

  async logout(): Promise<any> {
    return this.authService.logout()
      .then(() => this.snackBar.open('logout succesfull', '', { duration: 2000 }))
      .then(() => this.redirectOnLogout ? this.router.navigate([this.redirectOnLogout]) : null)
      .catch(e => this.errorHandler(e));
  }

  private errorHandler(error: any): void {
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}