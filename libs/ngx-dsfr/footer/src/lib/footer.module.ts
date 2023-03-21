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
import { DsfrFooterComponent } from './footer.component';
import { TestHostComponent } from './testing/test-host.component';
import { DsfrFooterCopyrightDirective } from './footer-copyright.directive';

@NgModule({
  imports: [CommonModule, RouterModule, DsfrButtonModule],
  declarations: [
    DsfrFooterComponent,
    DsfrFooterCopyrightDirective,
    TestHostComponent
  ],
  exports: [DsfrFooterComponent, DsfrFooterCopyrightDirective]
})
export class DsfrFooterModule { }
