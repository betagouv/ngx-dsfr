/**
 * Angular imports
 */
import { AfterContentInit, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * TypeScript entities and constants
 */
export interface TabDefinition {
  id: string;
  label: string;
  icon?: string;
}

export interface RoutedTabDefinition extends TabDefinition {
  route: string;
}

@Component({
  selector: 'dsfr-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class DsfrTabComponent implements AfterContentInit {
  @Input({ required: true })
  ariaLabel!: string;

  @Input()
  routedTabs: RoutedTabDefinition[] = [];

  @Input()
  initiallySelectedTab: number = 0;

  selectedTab: number = this.initiallySelectedTab;
  tabs: RoutedTabDefinition[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngAfterContentInit(): void {
    this.tabs = this.routedTabs.length > 0 ? this.routedTabs : [];

    if (this.routedTabs.length > 0) {
      // If we're using routed tabs...
      this.tabs = this.routedTabs;

      // In case of deep linking, figuring out which routed tab to display
      for (let i = 0; i < this.tabs.length; i++) {
        const tab: RoutedTabDefinition = this.tabs[i];

        if (this.router.url.includes(tab.route)) {
          this.selectedTab = i;
        }
      }

      // If we're not already on it, navigate to the required routed tab
      const newRoute: string = this.tabs[this.selectedTab].route;
      if (!this.router.url.includes(newRoute)) {
        this.navigateToRoutedTab(newRoute);
      }
    }
  }

  onTabClicked(clickedTab: RoutedTabDefinition, index: number): void {
    if (this.selectedTab !== index) {
      this.selectedTab = index;
      if (clickedTab.route) {
        this.navigateToRoutedTab(clickedTab.route);
      }
    }
  }

  private navigateToRoutedTab(route: string): void {
    this.router.navigate([route], {
      relativeTo: this.route
    });
  }
}
