/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { LinkModuleComponent } from './components/link-module/link-module.component';
import { ButtonModuleComponent } from './components/button-module/button-module.component';
import { BadgeModuleComponent } from './components/badge-module/badge-module.component';
import { HeaderModuleComponent } from './components/header-module/header-module.component';
import { NavigationModuleComponent } from './components/navigation-module/navigation-module.component';
import { RadioModuleComponent } from './components/radio-module/radio-module.component';
import { StepperModuleComponent } from './components/stepper-module/stepper-module.component';
import { AlertModuleComponent } from './components/alert-module/alert-module.component';
import { InputModuleComponent } from './components/input-module/input-module.component';
import { TileModuleComponent } from './components/tile-module/tile-module.component';
import { CheckboxModuleComponent } from './components/checkbox-module/checkbox-module.component';

/**
 * TypeScript entities and constants
 */
const routes: Route[] = [
  {
    path: 'alert',
    component: AlertModuleComponent
  },
  {
    path: 'badge',
    component: BadgeModuleComponent
  },
  {
    path: 'button',
    component: ButtonModuleComponent
  },
  {
    path: 'checkbox',
    component: CheckboxModuleComponent
  },
  {
    path: 'header',
    component: HeaderModuleComponent
  },
  {
    path: 'input',
    component: InputModuleComponent
  },
  {
    path: 'link',
    component: LinkModuleComponent
  },
  {
    path: 'navigation',
    component: NavigationModuleComponent
  },
  {
    path: 'radio',
    component: RadioModuleComponent
  },
  {
    path: 'stepper',
    component: StepperModuleComponent
  },
  {
    path: 'tile',
    component: TileModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
