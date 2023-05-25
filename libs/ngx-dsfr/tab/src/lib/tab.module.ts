/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrTabComponent } from './tab.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrTabComponent],
  exports: [DsfrTabComponent]
})
export class DsfrTabModule {}
