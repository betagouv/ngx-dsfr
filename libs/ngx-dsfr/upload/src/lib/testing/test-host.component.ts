/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-upload
      [label]="testLabel"
      [id]="testId"
      [hint]="testHint"
      [hasFailed]="testHasFailed"
      [multiple]="testMultiple"
      [failureMessage]="testFailureMessage">
    </dsfr-upload>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testId!: string;
  @Input() testHasFailed = false;
  @Input() testFailureMessage: string | undefined;
  @Input() testHint!: string;
  @Input() testMultiple: boolean = false;
}