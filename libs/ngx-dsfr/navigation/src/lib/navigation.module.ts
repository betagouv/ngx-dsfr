/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrNavigationComponent } from './navigation.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrNavigationComponent, TestHostComponent],
  exports: [DsfrNavigationComponent]
})
export class DsfrNavigationModule { }
