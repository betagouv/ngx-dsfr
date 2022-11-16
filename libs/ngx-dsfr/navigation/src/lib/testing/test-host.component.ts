/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */
import { Navigation } from '../navigation.component';

@Component({
  template: `
    <dsfr-navigation [navigation]="navigation"></dsfr-navigation>
  `
})
export class TestHostComponent {
  @Input() navigation: Navigation | undefined;

}
