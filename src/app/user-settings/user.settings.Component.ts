import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/models/user.model';
import { map, tap, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  template: '',
})

export class UserSettingsComponent {
  private currentUser$: Observable<UserModel>;
  private form: FormGroup;

  constructor(private db: AngularFirestore, private authService: AuthenticationService, private userService: UserService, public formBuilder: FormBuilder){
    this.form = formBuilder.group ({
      'uid' : new FormControl() ,
    });
    this.currentUser$ = this.userService.getUser().pipe(
      tap (user => { this.form.patchValue(user)}),
    );
  }

  /**
     * Sends a `FormGroup` of user data to the firebase database
     * If the key doens't exist in the db it will be created
     * empty data will not be changed
     * 
     * @usageNotes
     * sends a formgroup to the database
     * ```
     * var data = formBuilder.group ({
     *  'name' : someData,
     *  'age' : moreData,
     * })
     * updateAllDataWith(data);
     * ```
     */
  public updateAllDataWith(data: FormGroup): Promise<void> {
    return this.userService.updateUser(this.form.value.uid, data.value);
  }

  public updateAllData(keys: string[], values: any[]): Promise<void>{
    const data = this.formBuilder.group ({});

    for(var i = 0; i < keys.length; i++){
      data.addControl(keys[i], new FormControl());
      data.patchValue({ [keys[i]] : values[i]})
    }
    return this.updateAllDataWith(data);
  }

  public updateSingleValue(key: string, data: any): Promise<void>{
    this.form.addControl( key , new FormControl());
    this.form.patchValue({ key : data })
    return this.updateAllDataWith(this.form);
  }

  private async updateUserAge(data: string): Promise<void>{
    this.form.addControl( 'age' , new FormControl());
    this.form.patchValue({ age: Number.parseInt(data) })

    return this.userService.updateUser(this.form.value.uid, this.form.value);
  }
}