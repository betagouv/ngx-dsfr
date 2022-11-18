/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { DsfrTileComponent } from './tile.component';
import { TestHostComponent } from './testing/test-host.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrTileComponent, TestHostComponent],
  exports: [DsfrTileComponent]
})
export class DsfrTileModule { }
