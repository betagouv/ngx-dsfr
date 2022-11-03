/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrAlertComponent } from './alert.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrAlertComponent, TestHostComponent],
  exports: [DsfrAlertComponent]
})
export class DsfrAlertModule {
}
