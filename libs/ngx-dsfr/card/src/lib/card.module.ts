/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrCardComponent } from './card.component';
import { TestHostComponent } from './testing/test-host.component';
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrBadgeModule } from '@betagouv/ngx-dsfr/badge';
import { DsfrTagModule } from '@betagouv/ngx-dsfr/tag';

@NgModule({
  imports: [CommonModule, RouterModule, DsfrLinkModule, DsfrBadgeModule, DsfrTagModule],
  declarations: [DsfrCardComponent, TestHostComponent],
  exports: [DsfrCardComponent]
})
export class DsfrCardModule { }
