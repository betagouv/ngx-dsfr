/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';
import { DsfrBadgeModule } from '@betagouv/ngx-dsfr/badge';
import { DsfrNavigationModule } from '@betagouv/ngx-dsfr/navigation';
import { DsfrStepperModule } from '@betagouv/ngx-dsfr/stepper';

/**
 * Internal imports
 */
import { ModulesRoutingModule } from './modules-routing.module';
import { ButtonModuleComponent } from './components/button-module/button-module.component';
import { LinkModuleComponent } from './components/link-module/link-module.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { BadgeModuleComponent } from './components/badge-module/badge-module.component';
import { InputPropertyControlComponent } from './components/input-property-control/input-property-control.component';
import { NavigationModuleComponent } from './components/navigation-module/navigation-module.component';
import { StepperModuleComponent } from "./components/stepper-module/stepper-module.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DsfrLinkModule,
    DsfrButtonModule,
    DsfrBadgeModule,
    DsfrStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    DsfrNavigationModule,
    ModulesRoutingModule,
  ],
  declarations: [
    InputPropertyControlComponent,
    SimulatorComponent,
    LinkModuleComponent,
    ButtonModuleComponent,
    BadgeModuleComponent,
    NavigationModuleComponent,
    StepperModuleComponent
  ]
})
export class ModulesModule { }
