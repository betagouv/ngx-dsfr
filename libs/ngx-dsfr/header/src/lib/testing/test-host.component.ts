/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-header
      [institution]="testInstitution"
      [link]="testLink"
      [operatorLogoSrc]="testOperatorLogoSrc"
      [operatorLogoAlt]="testOperatorLogoAlt"
      [appName]="testAppName"
      [appDescription]="testAppDescription"></dsfr-header>
  `
})
export class TestHostComponent {
  @Input() testInstitution: string = '';
  @Input() testLink: string = '';
  @Input() testOperatorLogoSrc: string = '';
  @Input() testOperatorLogoAlt: string = '';
  @Input() testAppName: string = '';
  @Input() testAppDescription: string = '';
}
