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

/**
 * TypeScript entities and constants
 */
const exportableDeclarables = [DsfrTabComponent, DsfrProjectedTabDirective];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: exportableDeclarables,
  exports: exportableDeclarables
})
export class DsfrTabModule {}
