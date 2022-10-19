/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrInputComponent } from './input.component';
import { TestHostComponent } from './testing/test-host.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [DsfrInputComponent, TestHostComponent],
  exports: [DsfrInputComponent]
})
export class DsfrInputModule { }
