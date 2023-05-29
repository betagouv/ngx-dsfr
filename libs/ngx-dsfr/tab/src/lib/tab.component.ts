/**
 * Angular imports
 */
import {
  AfterContentChecked,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Internal imports
 */
import { TabDefinition } from './tab-definition';
import {
  DsfrProjectedTabDirective,
  ProjectedTabDefinition
} from './projected-tab.directive';

/**
 * TypeScript entities and constants
 */
export interface RoutedTabDefinition extends TabDefinition {
  route: string;
}

@Component({
  selector: 'dsfr-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class DsfrTabComponent implements OnChanges, AfterContentChecked {
  @Input({ required: true })
  ariaLabel!: string;

  @Input()
  routedTabs: RoutedTabDefinition[] = [];

  @Input()
  initiallySelectedTab: number = 0;

  @ContentChildren(DsfrProjectedTabDirective)
  projectedTabs: QueryList<DsfrProjectedTabDirective> | undefined;

  selectedTab: number = this.initiallySelectedTab;
  tabs: (RoutedTabDefinition | ProjectedTabDefinition)[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('routedTabs' in changes && this.routedTabs.length > 0) {
      this.initRoutedTabs();
    }
  }

  ngAfterContentChecked(): void {
    if (this.routedTabs.length > 0) {
      this.initRoutedTabs();
    } else if (this.projectedTabs) {
      // If we're using projected tabs...
      this.tabs = this.projectedTabs.map(
        (projectedTab: DsfrProjectedTabDirective) => {
          return {
            ...projectedTab.tabDefinition,
            panelContent: projectedTab.panelContent
          };
        }
      );
    }
  }

  private initRoutedTabs(): void {
    // If we're using routed tabs...
    this.tabs = this.routedTabs;

    // In case of deep linking, figuring out which routed tab to display
    for (let i = 0; i < this.tabs.length; i++) {
      const tab: RoutedTabDefinition = this.tabs[i] as RoutedTabDefinition;

      if (this.router.url.includes(tab.route)) {
        this.selectedTab = i;
      }
    }

    // If we're not already on it, navigate to the required routed tab
    const newRoute: string = (
      this.tabs[this.selectedTab] as RoutedTabDefinition
    ).route;
    if (!this.router.url.includes(newRoute)) {
      this.navigateToRoutedTab(newRoute);
    }
  }

  onTabClicked(
    clickedTab: RoutedTabDefinition | ProjectedTabDefinition,
    index: number
  ): void {
    if (this.selectedTab !== index) {
      this.selectedTab = index;
      if (this.isRoutedTab(clickedTab) && clickedTab.route) {
        this.navigateToRoutedTab(clickedTab.route);
      }
    }
  }

  isRoutedTab(
    tab: RoutedTabDefinition | ProjectedTabDefinition
  ): tab is RoutedTabDefinition {
    return 'route' in tab;
  }

  private navigateToRoutedTab(route: string): void {
    this.router.navigate([route], {
      relativeTo: this.route
    });
  }
}
