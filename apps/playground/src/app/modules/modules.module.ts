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
import { LinkModuleComponent } from './components/link-module/link-module.component';
import { SimulatorComponent } from './components/simulator/simulator.component';

@NgModule({
  imports: [DsfrLinkModule, ModulesRoutingModule],
  declarations: [LinkModuleComponent, SimulatorComponent]
})
export class ModulesModule {}
