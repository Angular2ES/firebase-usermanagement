import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'ng-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input('redirectOnSucces') redirectOnSucces: string;
  @Input('extraData') addExtraData: any;

  public loading: Boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  registerUser(email: string, password: string): void{
    this.loading = true;
    this.authService.createAccount(email, password, this.addExtraData)
      .then(() => this.loading = false)
      .then(() => { 
        if (this.redirectOnSucces != null) {
          this.router.navigate([this.redirectOnSucces])
        }
      })
      .catch((err) => alert(err))
  }
}
