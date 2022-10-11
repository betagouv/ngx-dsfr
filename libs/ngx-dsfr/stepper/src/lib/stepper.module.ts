/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import {DsfrStepperComponent} from "./stepper.component";
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrStepperComponent, TestHostComponent],
  exports: [DsfrStepperComponent]
})
export class DsfrStepperModule {}
