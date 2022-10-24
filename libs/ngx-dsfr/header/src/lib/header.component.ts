/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * 3rd-party imports
 */
import { ButtonType } from '@betagouv/ngx-dsfr/button';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ALT_ERROR: string =
  'You MUST provide a value for the operatorLogoAlt attribute 😡 !!!';

@Component({
  selector: 'dsfr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class DsfrHeaderComponent implements OnInit {
  @Input() institution: string = 'République\nFrançaise';
  @Input() operatorLogoSrc: string | undefined;
  @Input() operatorLogoAlt: string | undefined;
  @Input() appName: string | undefined;
  @Input() appDescription: string | undefined;
  @Input() link: string = '/';

  // To be changed into an Input property when we add searchBar functionality
  searchBar: boolean = false;

  institutionArray!: string[];
  institutionInlined!: string;
  appLinkTitle: string | undefined;
  isMobileMenuOpened: boolean = false;
  buttonTypes: typeof ButtonType = ButtonType;

  ngOnInit(): void {
    // Dealing with everything needed to represent the institution behind the operator
    this.institutionArray = this.institution.split('\n');
    this.institutionInlined = this.institution.replaceAll('\n', ' ');

    // Dealing with everything needed to represent the operator behind the app
    if (this.operatorLogoSrc && !this.operatorLogoAlt) {
      throw EMPTY_ALT_ERROR;
    }

    // Dealing with everything needed to represent the app
    if (this.appName) {
      this.appLinkTitle = `Accueil - ${this.appName} - `;
      this.appLinkTitle += this.operatorLogoSrc
        ? `${this.operatorLogoAlt} - `
        : '';
      this.appLinkTitle += this.institutionInlined;
    }
  }
}
