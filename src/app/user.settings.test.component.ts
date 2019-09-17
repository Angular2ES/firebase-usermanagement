import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { ToasterService } from 'angular2-toaster';
import { ValidationService } from 'src/services/validation.service';

@Component({
  selector: 'app-user-settings-test',
  templateUrl: './user-settings/user.settings.component.html',
  styleUrls: ['./user-settings/user.settings.component.css'],
})

export class UserSettingsTestComponent extends UserSettingsComponent{
  public data: FormGroup;
  
  constructor(authService: AuthenticationService, 
    userService: UserService, 
    public formBuilder: FormBuilder, toasterService: ToasterService, 
    private validationService: ValidationService){ 
    super(authService, userService, formBuilder, toasterService);

    this.data = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]]
    })
  }

  updateData(){ 
    this.updateAllDataWith(this.data);
  }

  updateMoreData(_age: string, _name: string){
    var variables: string[] = ['age', 'name']
    var values: any[] = [Number.parseInt(_age), _name]
    this.updateAllData(variables, values);
  }
}