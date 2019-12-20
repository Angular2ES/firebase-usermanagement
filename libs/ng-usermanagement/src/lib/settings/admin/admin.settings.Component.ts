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

  private curImpersonatedUser: Subscription;

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

    ngOnDestroy(): void {
      this.curImpersonatedUser.unsubscribe()
    }

  public async impersonateUser(uid: string) {
    this.loading = true;
    this.adminAuthService.impersonateUser(uid, this.adminSettingsForm.controls['uid'].value)
    .then(() => { 
      this.loading = false 
    })
    .catch((e) => this.errorHandler(e)) 
          } else {
            this.errorHandler({message: 'user does not exist'})
  }
      })
      ).subscribe();
  }
  
  private errorHandler(error: any): void {
    this.loading = false;
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}