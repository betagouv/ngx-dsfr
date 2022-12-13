/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';

/**
 * Internal imports
 */
import { DsfrPasswordComponent } from './password.component';
import { TestHostComponent } from './testing/test-host.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, DsfrLinkModule, DsfrButtonModule, FormsModule],
  declarations: [DsfrPasswordComponent, TestHostComponent],
  exports: [DsfrPasswordComponent]
})
export class DsfrPasswordModule { }
