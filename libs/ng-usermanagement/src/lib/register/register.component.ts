import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSnackBarToken, SnackBarInterface } from '../interfaces/snackbar-config.interface';
import { AuthenticationService } from '../services/auth.service';
import { verifyPassword } from '../validation-message/validators';

@Component({
  selector: 'ng-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Input() redirectOnSucces: string;
  @Input() addExtraData: any;

  @Output() private onSuccesCreateAccount = new EventEmitter<any>();

  public loading: Boolean = false;
  public registerForm: FormGroup;
  
  constructor(
    private authService: AuthenticationService,
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface,
    private router: Router) 
  { 
    this.registerForm = new FormBuilder().group({
      email: new FormControl('', {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {updateOn: 'blur', validators: [Validators.required]}),
      confirmPassword: new FormControl('', {updateOn: 'blur', validators: [Validators.required]})
    }, {updateOn: 'blur', validators: verifyPassword})
  }

  async registerUser(email: string, password: string): Promise<void> {
    try {
      this.loading = true;
      const userCredentials = await this.authService.createAccount(email, password, this.addExtraData)
      this.onSuccesCreateAccount.emit(userCredentials)
      this.loading = false
      if (this.redirectOnSucces != null) {
        await this.router.navigate([this.redirectOnSucces])
      }
      return Promise.resolve();
    } catch(err) {
      this.loading = false;
      this.snackBar.open(err.message, '', { duration: 2000 });
      return Promise.reject(err)
    }
  }
}
