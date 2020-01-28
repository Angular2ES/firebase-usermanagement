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

  /**
   * Redirect the user after a succesfully creating an account
   */
  @Input() redirectOnSucces: string;

  /**
   * Add extra data to the database on creating an account
   */
  @Input() addExtraData: any;

  /**
   * Sends an event after succesfully creating an account
   */
  @Output() private onSuccesCreateAccount = new EventEmitter<any>();

  public loading: Boolean = false;

  /**
   * register form group
   */
  public registerForm: FormGroup;
  
  constructor(
    private authService: AuthenticationService,
    @Inject(NgSnackBarToken) public snackBar: SnackBarInterface,
    private router: Router,
    private fb: FormBuilder) 
  { 
    this.registerForm = fb.group({
      email: new FormControl('', {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {updateOn: 'blur', validators: [Validators.required]}),
      confirmPassword: new FormControl('', {updateOn: 'blur', validators: [Validators.required]})
    }, {updateOn: 'blur', validators: verifyPassword})
  }

  /**
   * Register an user with an email and password
   * @param email 
   * @param password 
   */
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
