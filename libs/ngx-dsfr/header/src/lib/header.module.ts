/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrHeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrHeaderComponent],
  exports: [DsfrHeaderComponent]
})
export class DsfrHeaderModule {}
