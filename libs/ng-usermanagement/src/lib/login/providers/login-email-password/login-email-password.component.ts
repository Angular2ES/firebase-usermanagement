import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'ng-login-email-password',
  templateUrl: './login-email-password.component.html',
  styleUrls: ['./login-email-password.component.css']
})
export class LoginEmailPasswordComponent implements OnInit {

  @Input('redirectOnSucces') redirectOnSucces: string;
  
  @Output('onSucces') onSuccess: EventEmitter<auth.UserCredential> = new EventEmitter();
  @Output('onFailed') onFailed: EventEmitter<string> = new EventEmitter();

  public loginForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { 
    this.loginForm = this.formBuilder.group ({
      email: ['',[Validators.email, Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  ngOnInit() {
  }

  public loginUser(email: string, password: string){
    this.authService.loginWithEmailAndPassword(email, password)
    .then((Credential) => {
      this.snackBar.open('welcome', '', { duration: 2000 });
      this.onSuccess.next(Credential);
      if (this.redirectOnSucces != null) {
        this.router.navigate([this.redirectOnSucces])
      }
    })
    .catch((err) => {
      this.snackBar.open(err.message, '', { duration: 2000 });
      this.onSuccess.next(err);
    })
  }

}
