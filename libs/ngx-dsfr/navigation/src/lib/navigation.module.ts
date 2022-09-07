/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * 3rd party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';

/**
 * Internal imports
 */
import { DsfrNavigationComponent } from './navigation.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule, DsfrLinkModule, DsfrButtonModule],
  declarations: [DsfrNavigationComponent, TestHostComponent],
  exports: [DsfrNavigationComponent]
})
export class DsfrNavigationModule { }
