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
import { NavigationModuleComponent } from './components/navigation-module/navigation-module.component';
import { RadioModuleComponent } from './components/radio-module/radio-module.component';
import { StepperModuleComponent } from './components/stepper-module/stepper-module.component';
import { AlertModuleComponent } from './components/alert-module/alert-module.component';

/**
 * TypeScript entities and constants
 */
const routes: Route[] = [
  {
    path: 'badge',
    component: BadgeModuleComponent
  },
  {
    path: 'button',
    component: ButtonModuleComponent
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
    path: 'alert',
    component: AlertModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
}
