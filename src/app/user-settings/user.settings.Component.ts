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
  templateUrl: './user.settings.component.html',
  styleUrls: ['./user.settings.component.css'],
})

export class UserSettingsComponent {
  private currentUser$: Observable<UserModel>;
  private form: FormGroup;

  constructor(private db: AngularFirestore, private authService: AuthenticationService, private userService: UserService, formBuilder: FormBuilder){
    this.form = formBuilder.group ({
      'uid' : [] ,
    });
    this.currentUser$ = this.userService.getUser().pipe(
      tap (user => {
        
        this.form.patchValue(user)
      }),
        
    );
  }

  public updateAllData(data): Promise<void> {
    // data.forEach(element => {
    //   this.form.addControl(element.key, new FormControl());
    // });
    // this.form.patchValue(data);
    // return this.userService.updateUser(this.form.value.uid, this.form.value);
    return;
  }

  public async updateUserAge(data: string): Promise<void>{
    this.form.addControl( 'age' , new FormControl());
    this.form.patchValue({ age: Number.parseInt(data) })

    return this.userService.updateUser(this.form.value.uid, this.form.value);//));
  }
}