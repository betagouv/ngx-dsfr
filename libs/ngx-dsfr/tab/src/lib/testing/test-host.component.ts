/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */
import { RoutedTabDefinition } from '../tab.component';
import { TabDefinition } from '../tab-definition';

@Component({
  template: `
    <dsfr-tab
      [ariaLabel]="testAriaLabel"
      [routedTabs]="testRoutedTabs"
      [initiallySelectedTab]="testInitiallySelectedTab">
      <ng-container *dsfrProjectedTab="testProjectedTabs[0]">
        <p>You should eat 🥗 , it's good for you 😊</p>
      </ng-container>
      <ng-container *dsfrProjectedTab="testProjectedTabs[1]">
        <p>An 🍏 a day, keeps the cholesterol away 😅</p>
      </ng-container>
    </dsfr-tab>
  `
})
export class TestHostComponent {
  @Input() testAriaLabel!: string;
  @Input() testRoutedTabs: RoutedTabDefinition[] = [];
  @Input() testProjectedTabs: TabDefinition[] = [];
  @Input() testInitiallySelectedTab: number = 0;
}
