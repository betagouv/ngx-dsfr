/**
 * Angular imports
 */
import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Internal imports
 */
import { TabDefinition } from './tab-definition';

/**
 * TypeScript entities and constants
 */
export interface ProjectedTabDefinition extends TabDefinition {
  panelContent: TemplateRef<DsfrProjectedTabDirective>;
}

/**
 * We're using a Structural Directive here because we need access to
 * the projected content via TemplateRef and to supplement it with
 * extra information ( here, a tab definition )
 *
 * see: https://angular.io/guide/structural-directives
 */
@Directive({
  selector: '[dsfrProjectedTab]'
})
export class DsfrProjectedTabDirective {
  /**
   * We're using private properties, getters and setters, because we don't want
   * users of this Directive to be able to change these essential
   * properties, after they've been provided
   */
  private _tabDefinition!: TabDefinition;

  get tabDefinition(): TabDefinition {
    return this._tabDefinition;
  }

  get panelContent(): TemplateRef<DsfrProjectedTabDirective> {
    return this.templateRef;
  }

  @Input()
  set dsfrProjectedTab(tabDefinition: TabDefinition) {
    this._tabDefinition = tabDefinition;
  }

  constructor(
    private readonly templateRef: TemplateRef<DsfrProjectedTabDirective>
  ) {}
}
