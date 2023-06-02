/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { TagType } from '../tag.component';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-tag
      [label]="testLabel"
      [icon]="testIcon"
      [size]="testSize"
      [type]="testType"
      [link]="testLink"
      [isSelected]="testIsSelected"
    ></dsfr-tag>
  `
})
export class TestHostComponent {
  @Input() testLabel = '';
  @Input() testIcon = '';
  @Input() testSize = ElementSize.MEDIUM;
  @Input() testLink = '';
  @Input() testType = TagType.NON_CLICKABLE;
  @Input() testIsSelected = false;
}
