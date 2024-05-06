/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { DsfrUploadComponent } from './upload.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DsfrUploadComponent, TestHostComponent],
  exports: [DsfrUploadComponent]
})
export class DsfrUploadModule {}