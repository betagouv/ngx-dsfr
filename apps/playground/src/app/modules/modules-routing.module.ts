/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * Internal imports
 */
import { LinkWrapperComponent } from './components/link-wrapper/link-wrapper.component';

/**
 * TypeScript entities and constants
 */
const routes: Route[] = [
  {
    path: 'link',
    component: LinkWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
