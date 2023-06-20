/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';

/**
 * Internal imports
 */
import { DsfrTabComponent } from './tab.component';
import { DsfrProjectedTabDirective } from './projected-tab.directive';
import { TestHostComponent } from './testing/test-host.component';
import { TestRoutedComponent } from './testing/test-routed.component';

/**
 * TypeScript entities and constants
 */
const exportableDeclarables = [DsfrTabComponent, DsfrProjectedTabDirective];

@NgModule({
  imports: [CommonModule, RouterModule, ObserversModule],
  declarations: [
    ...exportableDeclarables,
    TestHostComponent,
    TestRoutedComponent
  ],
  exports: exportableDeclarables
})
export class DsfrTabModule {}
