/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { LinkModuleComponent } from './components/link-module/link-module.component';

/**
 * TypeScript entities and constants
 */
const routes: Route[] = [
  {
    path: 'link',
    component: LinkModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
