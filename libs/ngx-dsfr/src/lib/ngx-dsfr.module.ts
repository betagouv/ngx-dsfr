/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { RouterLinkDirectiveStub } from './testing/router-link.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [RouterLinkDirectiveStub]
})
export class NgxDsfrModule {}
