/**
 * Angular imports
 */
import {
  Component,
  inject,
  Injector,
  OnInit,
  runInInjectionContext
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { RoutedTabDefinition, TabDefinition } from '@betagouv/ngx-dsfr/tab';

@Component({
  templateUrl: './tab-module.component.html',
  styleUrls: ['./tab-module.component.scss']
})
export class TabModuleComponent implements OnInit {
  initialTab1: TabDefinition = {
    id: 'tab-1',
    label: 'Tab 1',
    icon: 'fr-icon-checkbox-line'
  };
  initialTab1Route: string = 'tab-content-1';
  initialTab1ProjectedText: string = 'My text, projected, for tab 1 : 🍓';

  initialTab2: TabDefinition = {
    id: 'tab-2',
    label: 'Tab 2',
    icon: 'fr-icon-checkbox-line'
  };
  initialTab2Route: string = 'tab-content-2';
  initialTab2ProjectedText: string = 'My text, projected, for tab 2 : 🍌';

  routedTabsForm = this.formBuilder.group({
    tab1Label: this.initialTab1.label,
    tab1Icon: this.initialTab1.icon,
    tab1Route: this.initialTab1Route,
    tab2Label: this.initialTab2.label,
    tab2Icon: this.initialTab2.icon,
    tab2Route: this.initialTab2Route
  });

  possibleRoutes: Record<string, string> = {
    'Routed Content 1': this.initialTab1Route,
    'Routed Content 2': this.initialTab2Route,
    'Routed Content 3': 'tab-content-3'
  };

  routedTabs: RoutedTabDefinition[] = [
    {
      ...this.initialTab1,
      id: this.initialTab1.id + '-routed',
      route: this.initialTab1Route
    },
    {
      ...this.initialTab2,
      id: this.initialTab2.id + '-routed',
      route: this.initialTab2Route
    }
  ];

  projectedTabsForm = this.formBuilder.group({
    tab1Label: this.initialTab1.label,
    tab1Icon: this.initialTab1.icon,
    tab1ProjectedText: this.initialTab1ProjectedText,
    tab2Label: this.initialTab2.label,
    tab2Icon: this.initialTab2.icon,
    tab2ProjectedText: this.initialTab2ProjectedText
  });

  projectedTabs: TabDefinition[] = [
    { ...this.initialTab1, id: this.initialTab1.id + '-projected' },
    { ...this.initialTab2, id: this.initialTab2.id + '-projected' }
  ];

  private readonly injector = inject(Injector);
  private untilComponentDestroyed = <T>() =>
    runInInjectionContext(this.injector, () => takeUntilDestroyed<T>());

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.updateRoutedTabs();
    this.updateProjectedTabs();
  }

  private updateRoutedTabs(): void {
    this.routedTabsForm.valueChanges
      .pipe(this.untilComponentDestroyed())
      .subscribe({
        next: (value) => {
          this.routedTabs = [
            {
              id: this.initialTab1.id,
              label: value.tab1Label!,
              icon: value.tab1Icon,
              route: value.tab1Route!
            },
            {
              id: this.initialTab2.id,
              label: value.tab2Label!,
              icon: value.tab2Icon,
              route: value.tab2Route!
            }
          ];
        }
      });
  }

  private updateProjectedTabs(): void {
    this.projectedTabsForm.valueChanges
      .pipe(this.untilComponentDestroyed())
      .subscribe({
        next: (value) => {
          this.projectedTabs = [
            {
              id: this.initialTab1.id,
              label: value.tab1Label!,
              icon: value.tab1Icon
            },
            {
              id: this.initialTab2.id,
              label: value.tab2Label!,
              icon: value.tab2Icon
            }
          ];
        }
      });
  }
}
