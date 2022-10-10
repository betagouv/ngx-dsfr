/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrRadioComponent } from './radio.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrRadioComponent, TestHostComponent],
  exports: [DsfrRadioComponent]
})
export class DsfrRadioModule {
}
