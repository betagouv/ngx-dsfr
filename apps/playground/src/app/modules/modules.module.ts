/**
 * Angular imports
 */
import { NgModule } from '@angular/core';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';

/**
 * Internal imports
 */
import { ModulesRoutingModule } from './modules-routing.module';
import { LinkWrapperComponent } from './components/link-wrapper/link-wrapper.component';

@NgModule({
  imports: [ModulesRoutingModule, DsfrLinkModule],
  declarations: [LinkWrapperComponent]
})
export class ModulesModule {}
