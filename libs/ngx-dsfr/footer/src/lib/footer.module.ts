/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrFooterComponent } from './footer.component';
import { TestHostComponent } from './testing/test-host.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    DsfrFooterComponent,
    TestHostComponent
  ],
  exports: [DsfrFooterComponent]
})
export class DsfrFooterModule { }
