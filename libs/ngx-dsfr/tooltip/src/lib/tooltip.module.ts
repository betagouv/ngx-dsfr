/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrTooltipComponent } from './tooltip.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrTooltipComponent, TestHostComponent],
  exports: [DsfrTooltipComponent]
})
export class DsfrTooltipModule {}
