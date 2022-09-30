/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { IRadioItem } from '../radio.component';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-radio
      [legend]="testLegend"
      [name]="testName"
      [hint]="testHint"
      [items]="testItems"
      [inline]="testInline"
      [disabled]="testDisabled"
      [size]="testSize"
      [hasFailed]="testHasFailed"
      [failureMessage]="testFailureMessage"
      [hasSucceeded]="testHasSucceeded"
      [successMessage]="testSuccessMessage"
    ></dsfr-radio>
  `
})
export class TestHostComponent {
  @Input() testLegend = '';
  @Input() testName = '';
  @Input() testHint = '';
  @Input() testItems: IRadioItem[] = [];
  @Input() testInline = false;
  @Input() testDisabled = false;
  @Input() testSize = ElementSize.MEDIUM;
  @Input() testHasFailed = false;
  @Input() testFailureMessage = '';
  @Input() testHasSucceeded = false;
  @Input() testSuccessMessage = '';
}
