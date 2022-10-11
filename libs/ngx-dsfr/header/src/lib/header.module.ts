/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrHeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrHeaderComponent],
  exports: [DsfrHeaderComponent]
})
export class DsfrHeaderModule {}
