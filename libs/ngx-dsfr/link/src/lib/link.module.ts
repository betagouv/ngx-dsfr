/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsfrLinkComponent } from './link.component';

/**
 * Internal imports
 */
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrLinkComponent],
  exports: [DsfrLinkComponent]
})
export class DsfrLinkModule {}
