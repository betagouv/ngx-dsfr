/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import { TagType } from '../tag.component';

@Component({
  template: `
    <dsfr-tag
      [label]="testLabel"
      [icon]="testIcon"
      [size]="testSize"
      [type]="testType"
      [link]="testLink"
      [isSelected]="testIsSelected"
      (selected)="testSelected()"
      (deleted)="testDeleted()"
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
  @Input() testSelected = () => {};
  @Input() testDeleted = () => {};
}
