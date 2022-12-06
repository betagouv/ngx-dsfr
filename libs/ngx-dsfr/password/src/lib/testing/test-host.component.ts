/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { PasswordParams, PasswordType } from '../password.component';

@Component({
  template: `
    <dsfr-password
      [type]="testType"
      [label]="testLabel"
      [id]="testId"
      [hint]="testHint"
      [placeholder]="testPlaceholder"
      [hasFailed]="testHasFailed"
      [forgotPasswordLink]="testForgotPasswordLink"
      [params]="testParams"
      [hasSucceeded]="testHasSucceeded"
    ></dsfr-password>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testId: string | undefined;
  @Input() testType: PasswordType = 'login';
  @Input() testHint: string | undefined;
  @Input() testPlaceholder: string = '';
  @Input() testHasFailed: boolean = false;
  @Input() testForgotPasswordLink: string = '';
  @Input() testHasSucceeded: boolean = false;
  @Input() testParams: PasswordParams = {
    minSize: 8,
    minSpecialCharacters: 1,
    minDigitalCharacters: 1
  };
}
