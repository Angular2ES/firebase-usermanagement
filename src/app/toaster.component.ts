import { ToasterService } from 'angular2-toaster';
import { Component } from '@angular/core';
@Component({
  template: `<toaster-container [toasterconfig]="toasterConfig"></toaster-container>`
})
export class ToasterComponent {
  constructor(){}

  public popToaster(toasterService: ToasterService, type: string, title: string, body: string): void {
    toasterService.pop(type, title, body)
  }

  public showAlert( type: string, title: string, body: string): void {
    alert(title + '\n' + body);
  }
}
