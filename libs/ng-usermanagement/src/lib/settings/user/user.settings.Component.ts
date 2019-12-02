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
      this.currentUser$ = this.userService.currentUser.pipe(
        tap(user => { this.userSettingsForm.patchValue(user)})
      )
    }

  async updateUserData(data: any): Promise<void> {
    this.loading = true;
    return this.userService.updateUser(this.userSettingsForm.controls['uid'].value, { ...data, ...this.addExtraData})
      .then(() => { this.loading = false; this.snackBarMessage('update succesfull') })
      .catch((e) => this.errorHandler(e));
  }

  async sendResetPasswordMail(): Promise<void> {
    this.loading = true;
    return this.userService.sendChangePasswordLink(this.userSettingsForm.controls['email'].value)
      .then(() => { this.loading = false; this.snackBarMessage('email has been send') })
      .catch((e) => this.errorHandler(e))
    }

   async deleteAccount(): Promise<void> {
    this.loading = true;
    try {
      await this.userService.deleteUserFromDatabase(this.userSettingsForm.controls['uid'].value)
      await this.authService.deleteAccount()
      this.loading = false;
      this.snackBarMessage('account has been deleted')
      this.redirectOnLogout ? this.router.navigate([this.redirectOnLogout]) : null
      return Promise.resolve();
    } catch(err){
      this.errorHandler(err);
    }
  }

  async logout(): Promise<void> {
    this.loading = true;
    return this.authService.logout()
    .then(() => this.redirectOnLogout ? this.router.navigate([this.redirectOnLogout]) : null)
    .then(() => { this.loading = false; this.snackBarMessage('logout succesfull') })
      .catch((e) => this.errorHandler(e));
  }

  private snackBarMessage(message: string): void {
    this.snackBar.open(message, '', { duration: 2000 })
  }

  private errorHandler(error: any): void {
    this.loading = false;
    this.snackBarMessage(error.message);
  }
}