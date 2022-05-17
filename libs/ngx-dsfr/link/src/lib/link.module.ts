/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsfrLinkComponent } from './link.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrLinkComponent],
  exports: [DsfrLinkComponent]
})
export class DsfrLinkModule {}
