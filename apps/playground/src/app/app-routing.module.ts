/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * TypeScript entities and constants
 */
const routes: Route[] = [
  {
    path: 'modules',
    loadChildren: () =>
      import('./modules/modules.module').then((module) => module.ModulesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
