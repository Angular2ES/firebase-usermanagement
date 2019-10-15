import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { ToasterService } from 'angular2-toaster';
import { ValidationService } from 'src/services/validation.service';

@Component({
  selector: 'app-user-settings-test',
  template: `
  <app-user-settings [formGroup]="data"></app-user-settings>
  `,
})

export class UserSettingsTestComponent{
  public data: FormGroup;
  public form: Object;
  
  constructor(authService: AuthenticationService, 
    userService: UserService, 
    public formBuilder: FormBuilder, toasterService: ToasterService, 
    private validationService: ValidationService){ 

    this.data = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      data1: ['', [Validators.required]],
    })
  }
}