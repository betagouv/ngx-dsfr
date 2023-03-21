/**
 * Angular imports
 */
import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

/**
 * Internal imports
 */
import { DsfrFooterCopyrightDirective } from './footer-copyright.directive';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ALT_ERROR: string = 'You MUST provide a value for the operatorLogoAlt attribute 😡 !!!';

export interface FooterCategoryLinks {
  title: string;
  children: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterBrand {
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
  @Input() categoriesLinks: FooterCategoryLinks[] | undefined;
  @Input() middleLinks: FooterLink[] | undefined;
  @Input() brands: FooterBrand[] | undefined;
  @Input() bottomLinks: FooterLink[] | undefined;

  @ContentChild(DsfrFooterCopyrightDirective) copyright!: DsfrFooterCopyrightDirective;

  institutionArray!: string[];
  institutionInlined!: string;
  appLinkTitle: string | undefined;

  ngOnInit(): void {
    this.handleInstitution();

    // Dealing with everything needed to represent the operator behind the app
    if (this.operatorLogoSrc && !this.operatorLogoAlt) {
      throw EMPTY_ALT_ERROR;
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
