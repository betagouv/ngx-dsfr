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
      [forgotPasswordLink]="testForgotPasswordLink"
      [params]="testParams"
    ></dsfr-password>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testId: string | undefined;
  @Input() testType: PasswordType = 'login';
  @Input() testHint: string | undefined;
  @Input() testPlaceholder: string = '';
  @Input() testForgotPasswordLink: string = '';
  @Input() testParams: PasswordParams = {
    minSize: 8,
    minSpecialCharacters: 1,
    minDigitalCharacters: 1
  };
}
