import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { verifyPassword } from '../validation-message/validators';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'ng-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input('redirectOnSucces') redirectOnSucces: string;
  @Input('extraData') addExtraData: any;

  @Output() private onFormGroupChange = new EventEmitter<any>();
  @Output() private onSuccesCreateAccount = new EventEmitter<any>();

  public loading: Boolean = false;
  public registerForm: FormGroup;
  
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router) 
  { 
    this.registerForm = new FormBuilder().group({
      email: new FormControl('', {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {updateOn: 'blur', validators: [Validators.required]}),
      confirmPassword: new FormControl('', {updateOn: 'blur', validators: [Validators.required]})
    }, {updateOn: 'blur', validators: verifyPassword})
  }

  ngOnInit() {
    this.onFormGroupChange.emit(this.registerForm)
  }

  registerUser(email: string, password: string): void{
    this.loading = true;
    this.authService.createAccount(email, password, this.addExtraData)
      .then((userCredentials) => {
        this.onSuccesCreateAccount.emit(userCredentials)
        this.loading = false
        if (this.redirectOnSucces != null) {
          this.router.navigate([this.redirectOnSucces])
        }
      })
      .catch((err) => {
        this.loading = false;
        this.snackBar.open(err.message, '', { duration: 2000 });
      })
  }
}
