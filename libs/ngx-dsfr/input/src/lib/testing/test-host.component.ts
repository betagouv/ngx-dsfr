/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { InputType } from '../input.component';

@Component({
  template: `
    <dsfr-input
      [label]="testLabel"
      [name]="testName"
      [id]="testId"
      [hint]="testHint"
      [type]="testType"
      [placeholder]="testPlaceholder"
      [disabled]="testDisabled"
      [hasFailed]="testHasFailed"
      [failureMessage]="testFailureMessage"
      [hasSucceeded]="testHasSucceeded"
      [successMessage]="testSuccessMessage"
    ></dsfr-input>
  `
})
export class TestHostComponent {
  @Input() testLabel: string | undefined;
  @Input() testName: string | undefined;
  @Input() testId: string | undefined;
  @Input() testType: InputType = 'text';
  @Input() testPlaceholder: string = '';
  @Input() testHasFailed = false;
  @Input() testFailureMessage: string | undefined;;
  @Input() testHasSucceeded = false;
  @Input() testSuccessMessage: string | undefined;
  @Input() testIcon?: string | undefined;
  @Input() testHint?: string | undefined;
  @Input() testDisabled: boolean = false;
}
