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
import { PasswordModuleComponent } from './components/password-module/password-module.component';
import { CheckboxModuleComponent } from './components/checkbox-module/checkbox-module.component';
import { SearchBarModuleComponent } from './components/search-bar-module/search-bar-module.component';
import { ErrorPageModuleComponent } from './components/error-page-module/error-page-module.component';
import { FooterModuleComponent } from './components/footer-module/footer-module.component';
import { ToggleModuleComponent } from './components/toggle-module/toggle-module.component';
import { TabModuleComponent } from './components/tab-module/tab-module.component';
import { TagModuleComponent } from './components/tag-module/tag-module.component';
import { RoutedContent1Component } from './components/routed-content/routed-content-1.component';
import { RoutedContent2Component } from './components/routed-content/routed-content-2.component';
import { RoutedContent3Component } from './components/routed-content/routed-content-3.component';
import { TooltipModuleComponent } from './components/tooltip-module/tooltip-module.component';

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
    path: 'error-page',
    component: ErrorPageModuleComponent
  },
  {
    path: 'footer',
    component: FooterModuleComponent
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
    path: 'password',
    component: PasswordModuleComponent
  },
  {
    path: 'radio',
    component: RadioModuleComponent
  },
  {
    path: 'search-bar',
    component: SearchBarModuleComponent
  },
  {
    path: 'stepper',
    component: StepperModuleComponent
  },
  {
    path: 'tab',
    component: TabModuleComponent,
    children: [
      {
        path: 'tab-content-1',
        component: RoutedContent1Component
      },
      {
        path: 'tab-content-2',
        component: RoutedContent2Component
      },
      {
        path: 'tab-content-3',
        component: RoutedContent3Component
      }
    ]
  },
  {
    path: 'tag',
    component: TagModuleComponent
  },
  {
    path: 'tile',
    component: TileModuleComponent
  },
  {
    path: 'toggle',
    component: ToggleModuleComponent
  },
  {
    path: 'tooltip',
    component: TooltipModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
