/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { CheckboxItem } from '../checkbox.component';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-checkbox
      [legend]="testLegend"
      [legendId]="testLegendId"
      [hint]="testHint"
      [items]="testItems"
      [inline]="testInline"
      [disabled]="testDisabled"
      [size]="testSize"
      [hasFailed]="testHasFailed"
      [failureMessage]="testFailureMessage"
      [hasSucceeded]="testHasSucceeded"
      [successMessage]="testSuccessMessage"
    ></dsfr-checkbox>
  `
})
export class TestHostComponent {
  @Input() testLegend = '';
  @Input() testLegendId = '';
  @Input() testHint = '';
  @Input() testItems: CheckboxItem[] = [];
  @Input() testInline = false;
  @Input() testDisabled = false;
  @Input() testSize = ElementSize.MEDIUM;
  @Input() testHasFailed = false;
  @Input() testFailureMessage = '';
  @Input() testHasSucceeded = false;
  @Input() testSuccessMessage = '';
}
