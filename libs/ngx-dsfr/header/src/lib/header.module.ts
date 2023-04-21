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
import { DsfrSearchBarModule } from '@betagouv/ngx-dsfr/search-bar';

/**
 * Internal imports
 */
import { DsfrHeaderComponent } from './header.component';
import { DsfrHeaderActionDirective } from './header-action.directive';
import { TestHostComponent } from './testing/test-host.component';
import { TestHostBasicComponent } from './testing/test-host-basic.component';
import { TestHostCompleteComponent } from './testing/test-host-complete.component';


@NgModule({
  imports: [CommonModule, RouterModule, DsfrButtonModule, DsfrSearchBarModule],
  declarations: [
    DsfrHeaderComponent,
    DsfrHeaderActionDirective,
    TestHostComponent,
    TestHostBasicComponent,
    TestHostCompleteComponent
  ],
  exports: [DsfrHeaderComponent, DsfrHeaderActionDirective]
})
export class DsfrHeaderModule { }
