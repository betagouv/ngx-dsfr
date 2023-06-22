/**
 * Angular imports
 */
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
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

export const EMPTY_ARIALABEL_ERROR: string =
  'You MUST provide a value for the ariaLabel attribute 😡 !!!';

@Component({
  selector: 'dsfr-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class DsfrTabComponent
  implements OnChanges, AfterContentInit, AfterViewInit
{
  @Input({ required: true })
  ariaLabel!: string;

  @Input()
  routedTabs: RoutedTabDefinition[] = [];

  @Input()
  initiallySelectedTab: number = 0;

  @Input()
  dynamicHeight: boolean = false;

  @ContentChildren(DsfrProjectedTabDirective)
  projectedTabs!: QueryList<DsfrProjectedTabDirective>;

  @ViewChild('tabsList', { static: true })
  tabsList!: ElementRef<HTMLElement>;

  @ViewChildren('selectedTabPanel')
  selectedTabPanel: QueryList<ElementRef<HTMLElement>> | undefined;

  selectedTab: number = this.initiallySelectedTab;
  tabs: (RoutedTabDefinition | ProjectedTabDefinition)[] = [];
  tabsHeight: number = 48;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.ariaLabel) {
      throw EMPTY_ARIALABEL_ERROR;
    }
    if ('routedTabs' in changes && this.routedTabs.length > 0) {
      this.initRoutedTabs();
    }
  }

  ngAfterContentInit(): void {
    if (this.routedTabs.length > 0 && this.tabs.length === 0) {
      this.initRoutedTabs();
    } else if (this.projectedTabs.length > 0 && this.tabs.length === 0) {
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setTabsHeight();
    }, 0);

    this.selectedTabPanel!.changes.subscribe({
      next: () => {
        this.setTabsHeight();
      }
    });
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

  onTabPanelContentChanged(): void {
    if (this.dynamicHeight) {
      this.setTabsHeight();
    }
  }

  isRoutedTab(
    tab: RoutedTabDefinition | ProjectedTabDefinition
  ): tab is RoutedTabDefinition {
    return 'route' in tab;
  }

  private setTabsHeight(): void {
    const tabsListHeight = this.tabsList.nativeElement.offsetHeight;
    const selectedTabPanelHeight =
      this.selectedTabPanel!.first.nativeElement.offsetHeight;
    this.tabsHeight = tabsListHeight + selectedTabPanelHeight;
    this.cdr.detectChanges();
  }

  private navigateToRoutedTab(route: string): void {
    this.router.navigate([route], {
      relativeTo: this.route
    });
  }
}
