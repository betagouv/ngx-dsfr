/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */
import { FooterLink, FooterLinksCategory, FooterPartner } from '../footer.component';

@Component({
  template: `
    <dsfr-footer
      [appName]="testAppName"
      [institution]="testInstitution"
      [link]="testLink"
      [operatorLogoSrc]="testOperatorLogoSrc"
      [operatorLogoAlt]="testOperatorLogoAlt"
      [linksPerCategories]="testLinksPerCategories"
      [partners]="testPartners"
      [bottomLinks]="testBottomLinks"
      [description]="testDescription">
    </dsfr-footer>
  `
})
export class TestHostComponent {
  @Input() testAppName: string = '';
  @Input() testInstitution: string = '';
  @Input() testLink: string = '';
  @Input() testOperatorLogoSrc: string = '';
  @Input() testOperatorLogoAlt: string = '';
  @Input() testDescription: string = '';
  @Input() testLinksPerCategories: FooterLinksCategory[] | undefined;
  @Input() testPartners: FooterPartner[] | undefined;
  @Input() testBottomLinks: FooterLink[] | undefined;
}
