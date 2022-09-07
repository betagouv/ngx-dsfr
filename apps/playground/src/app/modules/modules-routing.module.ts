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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
