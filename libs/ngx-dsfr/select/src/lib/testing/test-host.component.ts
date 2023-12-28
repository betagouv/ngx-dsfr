/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd-party imports
 */
import { SelectOption } from '@betagouv/ngx-dsfr/select';

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
      [description]="testDescription"
      [disabled]="testDisabled"
      [multiple]="testMultiple"
      [showSelectedOptions]="testShowSelectedOptions"
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
  @Input() testDescription = '';
  @Input() testDisabled = false;
  @Input() testMultiple = false;
  @Input() testShowSelectedOptions = false;
  @Input() testHasFailed = false;
  @Input() testFailureMessage = '';
  @Input() testHasSucceeded = false;
  @Input() testSuccessMessage = '';
}
