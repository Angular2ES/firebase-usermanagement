import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdminAuthService } from '../../services/admin.auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-admin-settings',
  templateUrl: './admin.settings.component.html',
  styleUrls: ['./admin.settings.component.css'],
})

export class AdminSettingsComponent implements OnDestroy {
  
  public currentUser$: Observable<any>
  public loading: boolean = false;

  private impUser: Subscription;
  
  public adminSettingsForm: FormGroup = this.formBuilder.group({
    uid: new FormControl(),
    displayName: new FormControl(),
  });
  
  constructor(
    private userService: UserService,
    private adminAuthService: AdminAuthService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar)
    {
      this. currentUser$ = this.userService.currentUser.pipe(
        tap(user => { this.adminSettingsForm.patchValue(user)})
        )
    }
    
    ngOnDestroy(): void {
      this.impUser.unsubscribe()
    }

    public async impersonateUser(uid: string) {
      this.loading = true;
      this.impUser = this.userService.getUserWithId(uid).pipe(
        map(user => {
          if (user){
            this.adminAuthService.impersonateUser(uid, this.adminSettingsForm.controls['uid'].value)
            .then(() => { 
              this.snackBar.open('succes', '', { duration: 2000 })
              this.loading = false 
            })
            .catch((e) => this.errorHandler(e)) 
          } else {
            this.errorHandler({message: 'user does not exist'})
          }
        })
      ).subscribe()
  }
  
  private errorHandler(error: any): void {
    this.loading = false;
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}