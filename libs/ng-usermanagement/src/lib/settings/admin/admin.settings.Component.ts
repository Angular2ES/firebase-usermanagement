import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../../services/admin.auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ng-admin-settings',
  templateUrl: './admin.settings.component.html',
  styleUrls: ['./admin.settings.component.css'],
})

export class AdminSettingsComponent {
  
  public currentUser$: Observable<any>
  
  public adminSettingsForm: FormGroup = this.formBuilder.group({
    uid: new FormControl(),
    displayName: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private adminAuthService: AdminAuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar)
    {
      this. currentUser$ = this.userService.getCurrentUser().pipe(
        tap(user => { this.adminSettingsForm.patchValue(user)})
      )
    }

  public impersonateUser(uid: string) {
    this.adminAuthService.impersonateUser(uid);    
  }

  private errorHandler(error: any): void {
    this.snackBar.open(error.message, '', { duration: 2000 });
  }
}