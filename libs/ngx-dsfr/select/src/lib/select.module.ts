/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

/**
 * 3rd-party imports
 */
import { DsfrTagModule } from '@betagouv/ngx-dsfr/tag';

/**
 * Internal imports
 */
import { DsfrSelectComponent } from './select.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, OverlayModule, DsfrTagModule],
  declarations: [DsfrSelectComponent, TestHostComponent],
  exports: [DsfrSelectComponent]
})
export class DsfrSelectModule {}
