/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrTagComponent } from './tag.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrTagComponent, TestHostComponent],
  exports: [DsfrTagComponent]
})
export class DsfrTagModule {}
