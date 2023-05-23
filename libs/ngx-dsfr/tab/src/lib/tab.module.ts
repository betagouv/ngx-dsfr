/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrTabComponent } from './tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrTabComponent],
  exports: [DsfrTabComponent]
})
export class DsfrTabModule {}
