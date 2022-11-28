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
import { DsfrPasswordComponent } from './password.component';
import { TestHostComponent } from './testing/test-host.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [DsfrPasswordComponent, TestHostComponent],
  exports: [DsfrPasswordComponent]
})
export class DsfrPasswordModule { }
