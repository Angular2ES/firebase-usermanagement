import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { inputValidation, InputValidationToken } from '../interfaces/input-validation.interface';

@Component({
  selector: 'ng-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input() control: FormControl;

  public errorMessage: Observable<string | void>;

  constructor(
    @Inject(InputValidationToken) public config: inputValidation
  ) {}
  
  ngOnInit() {
    this.errorMessage = this.control.valueChanges.pipe(
      map((control) => {
        for (let propertyName in this.control.errors) {
          if (this.control.touched) {
            console.log('prop', propertyName);
            return this.config[propertyName]
          }
        }
        return
      })
    )
  }
}