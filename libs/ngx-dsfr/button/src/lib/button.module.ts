/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrButtonComponent } from './button.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrButtonComponent, TestHostComponent],
  exports: [DsfrButtonComponent]
})
export class DsfrButtonModule { }
