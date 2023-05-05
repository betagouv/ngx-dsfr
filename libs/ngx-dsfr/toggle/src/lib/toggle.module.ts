/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrToggleComponent } from './toggle.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrToggleComponent, TestHostComponent],
  exports: [DsfrToggleComponent]
})
export class DsfrToggleModule {}
