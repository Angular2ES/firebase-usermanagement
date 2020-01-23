import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ng-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  /**
   * The formControl the application is validating
   */
  @Input() control: FormControl;

  /**
   * All of the possible messages the error can give
   */
  @Input() validationMessage = {
    required: 'Required',
    email: 'Invalid email address',
    verifyPassword: 'Verify your password',
  }

  public errorMessage: Observable<string | void>;

  constructor() {}
  
  ngOnInit() {
    this.errorMessage = this.control.valueChanges.pipe(
      map((control) => {
        for (let propertyName in this.control.errors) {
          if (this.control.touched) {
            return this.validationMessage[propertyName]
          }
        }
        return
      })
    )
  }
}