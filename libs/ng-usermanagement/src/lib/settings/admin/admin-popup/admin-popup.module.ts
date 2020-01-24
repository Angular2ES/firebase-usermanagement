import { NgModule } from '@angular/core'
import { AdminPopupComponent } from './admin-popup.component'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AdminPopupComponent, 
  ],
  exports:[
    AdminPopupComponent, 
  ],
  entryComponents: [
    AdminPopupComponent
  ],
})
export class AdminPopupModule {}