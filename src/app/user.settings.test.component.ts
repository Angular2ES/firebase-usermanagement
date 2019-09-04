import { UserSettingsComponent } from './user-settings/user.settings.Component';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-settings-test',
  templateUrl: './user-settings/user.settings.component.html',
  styleUrls: ['./user-settings/user.settings.component.css'],
})

export class UserSettingsTestComponent extends UserSettingsComponent{
  private data: FormGroup;
  
  constructor(db: AngularFirestore, authService: AuthenticationService, userService: UserService, public formBuilder: FormBuilder){ 
    super(db, authService, userService, formBuilder);
  }

  updateData(_age, _name){
    this.data = this.formBuilder.group ({
      'name' : _name,
      'age' : Number.parseInt(_age),
    })
    //this.data.patchValue({ name: _name, age: _age })
    this.updateAllDataWith(this.data);
  }

  updateMoreData(_age, _name){
    var variables: string[] = ['age', 'name']
    var values: any[] = [Number.parseInt(_age), _name]
    this.updateAllData(variables, values);
  }
}