/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Internal imports
 */
import { DsfrInputComponent } from './input.component';
import { TestHostComponent } from './testing/test-host.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DsfrInputComponent, TestHostComponent],
  exports: [DsfrInputComponent]
})
export class DsfrInputModule { }
