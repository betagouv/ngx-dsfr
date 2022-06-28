/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */
import { IconAlignment } from '../link.component';

@Component({
  template: `
    <dsfr-link
      [label]="testLabel"
      [link]="testLink"
      [title]="testTitle"
      [inline]="testInline"
      [icon]="testIcon"
      [iconAlignment]="testIconAlignment"
      [backToTop]="testBackToTop"></dsfr-link>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testLink: string = '';
  @Input() testTitle: string = '';
  @Input() testInline: boolean = true;
  @Input() testIcon: string | undefined;
  @Input() testIconAlignment: IconAlignment = IconAlignment.RIGHT;
  @Input() testBackToTop: boolean = false;
}
