import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgSnackBarToken, SnackBarInterface } from '../../interfaces/snackbar-config.interface';
import { UserModel } from '../../models/user.model';
import { AdminAuthService } from '../../services/admin.auth.service';
import { UserService } from '../../services/user.service';
import { AdminPopupService } from './admin-popup/admin-popup.service';

@Component({
  selector: 'ng-admin-settings',
  templateUrl: './admin.settings.component.html',
  styleUrls: ['./admin.settings.component.css'],
})

export class AdminSettingsComponent {
  
  /**
   * The current user
   */
  public currentUser$: Observable<UserModel>
  /**
   * A list of all the users
   */
  public allUsers$: Observable<UserModel[]>

  public loading: boolean = false;

  /**
   * The current selected user
   */
  selectedUser: UserModel;
  /**
   * Display the settings of the current selected user
   */
  displayUserSettigs: boolean = false;;

  /**
   * A formgroup of the current selected user
   * used for updating the user data
   */
  public selectedUserForm: FormGroup;
  
  /**
   * A formgroup of the current admin with a uid controller
   */
  public adminSettingsForm: FormGroup = this.formBuilder.group({
    uid: new FormControl(),
  });
  
  constructor(
    private userService: UserService,
    private adminAuthService: AdminAuthService,
    public formBuilder: FormBuilder,
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface,
    private adminPopup: AdminPopupService)
    {
      this.currentUser$ = this.userService.user$.pipe(
        tap(user => { this.adminSettingsForm.patchValue(user)})
        )
      this.allUsers$ = this.adminAuthService.allUsers;

      this.selectedUserForm = this.formBuilder.group({
        displayName: []
      })
    }

  /**
   * Impersonate a user with the user id
   * @param uid 
   */
  public async impersonateUser(uid: string) {
    this.loading = true;
    this.adminAuthService.impersonateUser(uid, this.adminSettingsForm.controls['uid'].value)
    .then(() => {
      this.adminPopup.open()
      this.loading = false 
      this.snackBar.open('login succesful', '', { duration: 2000 });
    })
    .catch((e) => this.errorHandler({ message: 'login failed' })) 
  }

  /**
   * Toggle the user settings popup
   * @param user 
   */
  public toggleUserSettingsPopup(user: UserModel): void {
    this.selectedUser = user;
    this.displayUserSettigs = !this.displayUserSettigs;
  }

  /**
   * Update the user settings
   * @param uid 
   * @param userData 
   */
  public updateUserSettings(uid: string, userData: Object): Promise<void> {
    this.loading = true;
    return this.adminAuthService.updateUserSettings(uid, userData)
      .then(result => {
        this.loading = false;
        this.snackBar.open(result, '', { duration: 2000 })
      })
      .catch((error) => this.errorHandler({message: error}))
  }
  
  /**
   * remove the loading and show a snackbar of the error
   * @param error - An object with a message variable
   */
  private errorHandler(error: any): void {
    this.loading = false;
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}