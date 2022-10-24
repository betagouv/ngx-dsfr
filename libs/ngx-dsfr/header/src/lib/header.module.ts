/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * 3rd-party imports
 */
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';

/**
 * Internal imports
 */
import { DsfrHeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule, DsfrButtonModule],
  declarations: [DsfrHeaderComponent],
  exports: [DsfrHeaderComponent]
})
export class DsfrHeaderModule {}
