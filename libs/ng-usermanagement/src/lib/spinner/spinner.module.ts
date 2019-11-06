import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule, MatButtonModule, MatButtonToggleModule, MatBottomSheetModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [SpinnerComponent]
})
export class SpinnerModule { }