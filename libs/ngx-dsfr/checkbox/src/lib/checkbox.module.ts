/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Internal imports
 */
import { DsfrCheckboxComponent } from './checkbox.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [DsfrCheckboxComponent, TestHostComponent],
  exports: [DsfrCheckboxComponent]
})
export class DsfrCheckboxModule { }
