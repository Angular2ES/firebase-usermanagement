import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AdminAuthService } from '../../services/admin.auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-admin-settings',
  templateUrl: './admin.settings.component.html',
  styleUrls: ['./admin.settings.component.css'],
})

export class AdminSettingsComponent {
  
  public currentUser$: Observable<UserModel>
  public allUsers$: Observable<UserModel[]>

  public loading: boolean = false;

  selectedUser: UserModel;
  displayUserSettigs: boolean = false;;

  public selectedUserForm: FormGroup;
  
  public adminSettingsForm: FormGroup = this.formBuilder.group({
    uid: new FormControl(),
  });
  
  constructor(
    private userService: UserService,
    private adminAuthService: AdminAuthService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar)
    {
      this.currentUser$ = this.userService.user$.pipe(
        tap(user => { this.adminSettingsForm.patchValue(user)})
        )
      this.allUsers$ = this.adminAuthService.allUsers;

      this.selectedUserForm = this.formBuilder.group({
        displayName: []
      })
    }

  public async impersonateUser(uid: string) {
    this.loading = true;
    this.adminAuthService.impersonateUser(uid, this.adminSettingsForm.controls['uid'].value)
    .then(() => { 
      this.loading = false 
    })
    .catch((e) => this.errorHandler(e)) 
  }

  public toggleUserSettingsPopup(user: UserModel): void {
    this.selectedUser = user;
    this.displayUserSettigs = !this.displayUserSettigs;
  }

  public updateUserSettings(uid: string, userData: Object): Promise<void> {
    this.loading = true;
    return this.adminAuthService.updateUserSettings(uid, userData)
      .then(result => {
        this.loading = false;
        this.snackBar.open(result, '', { duration: 2000 })
      })
      .catch((error) => this.errorHandler({message: error}))
  }
  
  private errorHandler(error: any): void {
    this.loading = false;
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}