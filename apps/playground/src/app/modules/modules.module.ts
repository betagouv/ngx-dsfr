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
import { DsfrFooterModule } from '@betagouv/ngx-dsfr/footer';
import {
  DsfrSearchBarModule,
  DSFR_SEARCH_BAR_SERVICE_TOKEN
} from '@betagouv/ngx-dsfr/search-bar';
import { DsfrErrorPageModule } from '@betagouv/ngx-dsfr/error-page';
import { DsfrToggleModule } from '@betagouv/ngx-dsfr/toggle';
import { DsfrTabModule } from '@betagouv/ngx-dsfr/tab';
import { DsfrTagModule } from '@betagouv/ngx-dsfr/tag';

/**
 * Internal imports
 */
import { ModulesRoutingModule } from './modules-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ButtonModuleComponent } from './components/button-module/button-module.component';
import { LinkModuleComponent } from './components/link-module/link-module.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { BadgeModuleComponent } from './components/badge-module/badge-module.component';
import { HeaderModuleComponent } from './components/header-module/header-module.component';
import { NavigationModuleComponent } from './components/navigation-module/navigation-module.component';
import { RadioModuleComponent } from './components/radio-module/radio-module.component';
import { AlertModuleComponent } from './components/alert-module/alert-module.component';
import { StepperModuleComponent } from './components/stepper-module/stepper-module.component';
import { InputModuleComponent } from './components/input-module/input-module.component';
import { TileModuleComponent } from './components/tile-module/tile-module.component';
import { PasswordModuleComponent } from './components/password-module/password-module.component';
import { CheckboxModuleComponent } from './components/checkbox-module/checkbox-module.component';
import { SearchBarModuleComponent } from './components/search-bar-module/search-bar-module.component';
import { TestSearchService } from './components/search-bar-module/search-bar-module.service';
import { ErrorPageModuleComponent } from './components/error-page-module/error-page-module.component';
import { FooterModuleComponent } from './components/footer-module/footer-module.component';
import { ToggleModuleComponent } from './components/toggle-module/toggle-module.component';
import { TabModuleComponent } from './components/tab-module/tab-module.component';
import { RoutedContent1Component } from './components/routed-content/routed-content-1.component';
import { RoutedContent2Component } from './components/routed-content/routed-content-2.component';
import { RoutedContent3Component } from './components/routed-content/routed-content-3.component';
import { TagModuleComponent } from './components/tag-module/tag-module.component';
import { UploadModuleComponent } from './components/upload-module/upload-module.component';
import { DsfrUploadModule } from '@betagouv/ngx-dsfr/upload';

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
    DsfrSearchBarModule,
    DsfrErrorPageModule,
    DsfrFooterModule,
    DsfrToggleModule,
    DsfrTabModule,
    DsfrTagModule,
    DsfrUploadModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ModulesRoutingModule
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
    StepperModuleComponent,
    SearchBarModuleComponent,
    ErrorPageModuleComponent,
    FooterModuleComponent,
    ToggleModuleComponent,
    TabModuleComponent,
    TagModuleComponent,
    UploadModuleComponent,
    RoutedContent1Component,
    RoutedContent2Component,
    RoutedContent3Component
  ],
  providers: [
    {
      provide: DSFR_SEARCH_BAR_SERVICE_TOKEN,
      useClass: TestSearchService
    }
  ]
})
export class ModulesModule {}
