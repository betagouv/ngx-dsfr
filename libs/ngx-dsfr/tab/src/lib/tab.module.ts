/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrTabComponent } from './tab.component';
import { DsfrProjectedTabDirective } from './projected-tab.directive';
import { TestHostComponent } from './testing/test-host.component';

/**
 * TypeScript entities and constants
 */
const exportableDeclarables = [DsfrTabComponent, DsfrProjectedTabDirective];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [...exportableDeclarables, TestHostComponent],
  exports: exportableDeclarables
})
export class DsfrTabModule {}
