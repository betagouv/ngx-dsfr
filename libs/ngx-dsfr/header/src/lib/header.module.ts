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
import { DsfrHeaderActionDirective } from './header-action.directive';

@NgModule({
  imports: [CommonModule, RouterModule, DsfrButtonModule],
  declarations: [DsfrHeaderComponent, DsfrHeaderActionDirective],
  exports: [DsfrHeaderComponent, DsfrHeaderActionDirective]
})
export class DsfrHeaderModule {}
