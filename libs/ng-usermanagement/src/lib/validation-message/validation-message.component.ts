import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { defaultInputValidation, IInputValidation, InputValidationToken } from '../interfaces/input-validation.interface';

@Component({
  selector: 'ng-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {

  @Input() control: FormControl;

  constructor(
    @Inject(InputValidationToken) public config: IInputValidation
  ) { }
  
  ngOnInit() {
  }
  
  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return this.config[propertyName] //this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}