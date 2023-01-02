/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Internal imports
 */
import { RouterLinkDirectiveStub } from './testing/router-link.stub';
import { RouterLinkActiveDirectiveStub } from './testing/router-link-active.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [RouterLinkDirectiveStub, RouterLinkActiveDirectiveStub]
})
export class NgxDsfrModule {}
