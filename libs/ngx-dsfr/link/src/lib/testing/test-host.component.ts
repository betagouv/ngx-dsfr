/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementAlignment } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */

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
  @Input() testIconAlignment: ElementAlignment = ElementAlignment.RIGHT;
  @Input() testBackToTop: boolean = false;
}
