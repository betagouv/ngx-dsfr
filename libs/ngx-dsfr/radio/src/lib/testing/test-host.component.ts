/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { RadioItem } from '../radio.component';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-radio
      [legend]="testLegend"
      [name]="testName"
      [fieldSetId]="testFieldSetId"
      [hint]="testHint"
      [items]="testItems"
      [inline]="testInline"
      [disabled]="testDisabled"
      [size]="testSize"
      [hasFailed]="testHasFailed"
      [failureMessage]="testFailureMessage"
      [failureId]="testFailureId"
      [hasSucceeded]="testHasSucceeded"
      [successMessage]="testSuccessMessage"
      [successId]="testSuccessId"
    ></dsfr-radio>
  `
})
export class TestHostComponent {
  @Input() testLegend = '';
  @Input() testName = '';
  @Input() testFieldSetId = '';
  @Input() testHint = '';
  @Input() testItems: RadioItem[] = [];
  @Input() testInline = false;
  @Input() testDisabled = false;
  @Input() testSize = ElementSize.MEDIUM;
  @Input() testHasFailed = false;
  @Input() testFailureMessage = '';
  @Input() testFailureId = '';
  @Input() testHasSucceeded = false;
  @Input() testSuccessMessage = '';
  @Input() testSuccessId = '';
}
