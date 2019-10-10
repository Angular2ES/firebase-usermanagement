import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
  `,
})
export class AppComponent {

}
