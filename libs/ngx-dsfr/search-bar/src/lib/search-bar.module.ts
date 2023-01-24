/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrSearchBarComponent } from './search-bar.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrSearchBarComponent, TestHostComponent],
  exports: [DsfrSearchBarComponent]
})
export class DsfrSearchBarModule { }
