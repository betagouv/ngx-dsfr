/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-upload
      [label]="testLabel"
      [name]="testName"
      [id]="testId"
      [hint]="testHint"
      [disabled]="testDisabled"
      [hasFailed]="testHasFailed"
      [multiple]="testMultiple"
      [failureMessage]="testFailureMessage">
    </dsfr-upload>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testName: string | undefined;
  @Input() testId: string | undefined;
  @Input() testHasFailed = false;
  @Input() testFailureMessage: string | undefined;
  @Input() testHint?: string | undefined;
  @Input() testDisabled: boolean = false;
  @Input() testMultiple: boolean = false;
}
