/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

/**
 * 3rd-party imports
 */
import { DsfrLinkModule } from '@betagouv/ngx-dsfr/link';
import { DsfrButtonModule } from '@betagouv/ngx-dsfr/button';
import { DsfrBadgeModule } from '@betagouv/ngx-dsfr/badge';
import { DsfrHeaderModule } from '@betagouv/ngx-dsfr/header';
import { DsfrNavigationModule } from '@betagouv/ngx-dsfr/navigation';
import { DsfrRadioModule } from '@betagouv/ngx-dsfr/radio';
import { DsfrCheckboxModule } from '@betagouv/ngx-dsfr/checkbox';
import { DsfrStepperModule } from '@betagouv/ngx-dsfr/stepper';
import { DsfrAlertModule } from '@betagouv/ngx-dsfr/alert';
import { DsfrInputModule } from '@betagouv/ngx-dsfr/input';
import { DsfrTileModule } from '@betagouv/ngx-dsfr/tile';
import { DsfrPasswordModule } from '@betagouv/ngx-dsfr/password';

/**
 * Internal imports
 */
import { ModulesRoutingModule } from './modules-routing.module';
import { ButtonModuleComponent } from './components/button-module/button-module.component';
import { LinkModuleComponent } from './components/link-module/link-module.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { BadgeModuleComponent } from './components/badge-module/badge-module.component';
import { HeaderModuleComponent } from './components/header-module/header-module.component';
import { NavigationModuleComponent } from './components/navigation-module/navigation-module.component';
import { RadioModuleComponent } from './components/radio-module/radio-module.component';
import { AlertModuleComponent } from './components/alert-module/alert-module.component';
import { SharedModule } from '../shared/shared.module';
import { StepperModuleComponent } from "./components/stepper-module/stepper-module.component";
import { InputModuleComponent } from './components/input-module/input-module.component';
import { TileModuleComponent } from './components/tile-module/tile-module.component';
import { PasswordModuleComponent } from './components/password-module/password-module.component';
import { CheckboxModuleComponent } from './components/checkbox-module/checkbox-module.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    DsfrLinkModule,
    DsfrButtonModule,
    DsfrBadgeModule,
    DsfrNavigationModule,
    DsfrRadioModule,
    DsfrStepperModule,
    DsfrAlertModule,
    DsfrHeaderModule,
    DsfrInputModule,
    DsfrTileModule,
    DsfrPasswordModule,
    DsfrCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ModulesRoutingModule,
  ],
  declarations: [
    SimulatorComponent,
    LinkModuleComponent,
    ButtonModuleComponent,
    BadgeModuleComponent,
    RadioModuleComponent,
    StepperModuleComponent,
    AlertModuleComponent,
    NavigationModuleComponent,
    HeaderModuleComponent,
    InputModuleComponent,
    TileModuleComponent,
    PasswordModuleComponent,
    CheckboxModuleComponent,
    StepperModuleComponent
  ]
})
export class ModulesModule { }
