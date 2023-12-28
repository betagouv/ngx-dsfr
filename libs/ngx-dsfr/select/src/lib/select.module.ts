/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

/**
 * Internal imports
 */
import { DsfrSelectComponent } from './select.component';
import { DsfrOptionsComponent } from './options.component';
import { DsfrTagModule } from '../../../tag/src/index';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule, DsfrTagModule],
  declarations: [DsfrSelectComponent, DsfrOptionsComponent, TestHostComponent],
  exports: [DsfrSelectComponent]
})
export class DsfrSelectModule {
}
