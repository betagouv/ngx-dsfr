/**
 * Angular imports
 */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ALT_ERROR: string = 'You MUST provide a value for the operatorLogoAlt attribute 😡 !!!';
export const EMPTY_COPYRIGHT_ERROR: string = 'You MUST provide a value for the copyright attribute 😡 !!!';

export interface FooterLinksCategory {
  title: string;
  children: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  title: string;
  isExternal?: boolean;
}

export interface FooterPartner {
  image: string;
  href: string;
  alt: string;
}

@Component({
  selector: 'dsfr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class DsfrFooterComponent implements OnInit, OnChanges {

  @Input() appName: string | undefined;
  @Input() institution: string = 'République\nFrançaise';
  @Input() operatorLogoSrc: string | undefined;
  @Input() operatorLogoAlt: string | undefined;
  @Input() link: string = '/';
  @Input() description: string | undefined;
  @Input() linksPerCategories: FooterLinksCategory[] | undefined;
  @Input() partners: FooterPartner[] | undefined;
  @Input() bottomLinks: FooterLink[] | undefined;
  @Input() copyright: FooterLink | undefined;

  institutionArray!: string[];
  institutionInlined!: string;

  ngOnInit(): void {
    this.handleInstitution();

    // Dealing with everything needed to represent the operator behind the app
    if (this.operatorLogoSrc && !this.operatorLogoAlt) {
      throw EMPTY_ALT_ERROR;
    }

    if (!this.copyright) {
      throw EMPTY_COPYRIGHT_ERROR;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['institution'] && changes['institution'].currentValue) {
      this.handleInstitution();
    }
  }

  private handleInstitution(): void {
    // Dealing with everything needed to represent the institution behind the operator
    this.institutionArray = this.institution.split('\n');
    this.institutionInlined = this.institution.replaceAll('\n', ' ');
  }
}
