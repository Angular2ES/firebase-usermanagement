import { Component } from '@angular/core';
import { SnackBarInterface } from 'libs/ng-usermanagement/src/lib/interfaces/snackbar-config.interface';

@Component({
  selector: 'app-admin-settings',
  template: ``
})

export class SnackBarComponent implements SnackBarInterface{
  
  constructor() {}

  open(message: string, action?: string, config?: any) {
    console.log(message);
  }
} 
