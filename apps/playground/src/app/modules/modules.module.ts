/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';

/**
 * Internal imports
 */
import { ModulesRoutingModule } from './modules-routing.module';
import { ButtonModuleComponent } from './components/button-module/button-module.component';
import { LinkModuleComponent } from './components/link-module/link-module.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { BadgeModuleComponent } from './components/badge-module/badge-module.component';
import { DsfrBadgeModule } from '@betagouv/ngx-dsfr/badge';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DsfrLinkModule,
    DsfrButtonModule,
    DsfrBadgeModule,
    ModulesRoutingModule
  ],
  declarations: [
    LinkModuleComponent,
    SimulatorComponent,
    ButtonModuleComponent,
    BadgeModuleComponent
  ]
})
export class ModulesModule { }
