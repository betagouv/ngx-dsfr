/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrFormFieldComponent } from './form-field.component';
import { TestHostComponent } from './testing/test-host.component';
import { DsfrHintComponent } from './hint/hint.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrFormFieldComponent, DsfrHintComponent, TestHostComponent],
  exports: [DsfrFormFieldComponent, DsfrHintComponent]
})
export class DsfrFormFieldModule { }
