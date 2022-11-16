/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrCheckboxComponent } from './checkbox.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrCheckboxComponent, TestHostComponent],
  exports: [DsfrCheckboxComponent]
})
export class DsfrCheckboxModule { }
