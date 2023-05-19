/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ErrorStatus } from '../error-page.component';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-error-page
      [title]="testTitle"
      [status]="testStatus"
      [homeLink]="testHomeLink"
      [contactUsLink]="testContactUsLink">
    </dsfr-error-page>
  `
})
export class TestHostComponent {
  @Input() testTitle: string = '';
  @Input() testHomeLink: string = '';
  @Input() testContactUsLink: string = '';
  @Input() testStatus: ErrorStatus = '404';
}
