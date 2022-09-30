/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Internal imports
 */
import { DsfrRadioComponent } from './radio.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DsfrRadioComponent, TestHostComponent],
  exports: [DsfrRadioComponent]
})
export class DsfrRadioModule {
}
