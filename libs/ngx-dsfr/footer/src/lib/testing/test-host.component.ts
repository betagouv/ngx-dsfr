/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-footer
      [appName]="testAppName"
      [institution]="testInstitution"
      [link]="testLink"
      [operatorLogoSrc]="testOperatorLogoSrc"
      [operatorLogoAlt]="testOperatorLogoAlt"
      [description]="testDescription">
      <ng-template dsfrFooterCopyright>
        {{ testCopyright }}
      </ng-template>
    </dsfr-footer>
  `
})
export class TestHostComponent {

  testCopyright = '';

  @Input() testAppName: string = '';
  @Input() testInstitution: string = '';
  @Input() testLink: string = '';
  @Input() testOperatorLogoSrc: string = '';
  @Input() testOperatorLogoAlt: string = '';
  @Input() testDescription: string = '';
}
