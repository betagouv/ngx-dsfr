/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { SelectOption } from '../select.component';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-select
      [label]="testLabel"
      [id]="testId"
      [hint]="testHint"
      [options]="testOptions"
      [defaultPlaceholder]="testDefaultPlaceholder"
      [disabled]="testDisabled"
      [multiple]="testMultiple"
      [showSelectedValues]="testShowSelectedValues"
      [hasFailed]="testHasFailed"
      [failureMessage]="testFailureMessage"
      [hasSucceeded]="testHasSucceeded"
      [successMessage]="testSuccessMessage"
    ></dsfr-select>
  `
})
export class TestHostComponent {
  @Input() testLabel = '';
  @Input() testId = '';
  @Input() testHint = '';
  @Input() testOptions: SelectOption[] = [];
  @Input() testDefaultPlaceholder = '';
  @Input() testDisabled = false;
  @Input() testMultiple = false;
  @Input() testShowSelectedValues = false;
  @Input() testHasFailed = false;
  @Input() testFailureMessage = '';
  @Input() testHasSucceeded = false;
  @Input() testSuccessMessage = '';
}
