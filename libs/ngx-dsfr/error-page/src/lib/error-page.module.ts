/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrErrorPageComponent } from './error-page.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrErrorPageComponent, TestHostComponent],
  exports: [DsfrErrorPageComponent]
})
export class DsfrErrorPageModule {}
