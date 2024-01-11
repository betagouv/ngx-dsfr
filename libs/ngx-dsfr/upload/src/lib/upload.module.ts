/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrUploadComponent } from './upload.component';
import { TestHostComponent } from './testing/test-host.component';
import { FormsModule } from '@angular/forms';
import { DsfrInputModule } from '@betagouv/ngx-dsfr/input';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DsfrInputModule
  ],
  declarations: [
    DsfrUploadComponent,
    TestHostComponent
  ],
  exports: [DsfrUploadComponent]
})
export class DsfrUploadModule { }
