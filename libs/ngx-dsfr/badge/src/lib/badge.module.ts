/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrBadgeComponent } from './badge.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrBadgeComponent, TestHostComponent],
  exports: [DsfrBadgeComponent]
})
export class DsfrBadgeModule { }
