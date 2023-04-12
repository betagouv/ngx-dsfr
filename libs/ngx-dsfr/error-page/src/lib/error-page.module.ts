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
import { DsfrErrorPageDescriptionDirective, DsfrErrorPageSubDescriptionDirective } from './error-page-content.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [DsfrErrorPageComponent, DsfrErrorPageDescriptionDirective, DsfrErrorPageSubDescriptionDirective , TestHostComponent],
  exports: [DsfrErrorPageComponent, DsfrErrorPageDescriptionDirective, DsfrErrorPageSubDescriptionDirective ]
})
export class DsfrErrorPageModule {}
