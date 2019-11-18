import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { verifyPassword } from '../validation-message/validators';

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
    private router: Router) 
  { 
    this.registerForm = new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: verifyPassword})
  }

  ngOnInit() {
    this.onFormGroupChange.emit(this.registerForm)
  }

  registerUser(email: string, password: string): void{
    this.loading = true;
    this.authService.createAccount(email, password, this.addExtraData)
      .then((userCredentials) => this.onSuccesCreateAccount.emit(userCredentials))
      .then(() => this.loading = false)
      .then(() => { 
        if (this.redirectOnSucces != null) {
          this.router.navigate([this.redirectOnSucces])
        }
      })
      
      .catch((err) => alert(err))
  }
}
