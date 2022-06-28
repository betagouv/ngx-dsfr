/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrLinkComponent } from './link.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrLinkComponent, TestHostComponent],
  exports: [DsfrLinkComponent]
})
export class DsfrLinkModule {}
