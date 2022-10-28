/**
 * Angular imports
 */
import {
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges
} from '@angular/core';

/**
 * 3rd-party imports
 */
import { ButtonType } from '@betagouv/ngx-dsfr/button';

/**
 * Internal imports
 */
import { DsfrHeaderActionDirective } from './header-action.directive';
import { DsfrNavigationComponent } from '@betagouv/ngx-dsfr/navigation';

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
export class DsfrHeaderComponent implements OnChanges {
  @Input() institution: string = 'République\nFrançaise';
  @Input() operatorLogoSrc: string | undefined;
  @Input() operatorLogoAlt: string | undefined;
  @Input() appName: string | undefined;
  @Input() appDescription: string | undefined;
  @Input() link: string = '/';

  @ContentChildren(DsfrHeaderActionDirective)
  actions!: QueryList<DsfrHeaderActionDirective>;
  @ContentChild(DsfrNavigationComponent) nav?: DsfrNavigationComponent;

  // To be changed into an Input property when we add searchBar functionality
  searchBar: boolean = false;

  institutionArray!: string[];
  institutionInlined!: string;
  appLinkTitle: string | undefined;
  isMobileMenuOpened: boolean = false;
  buttonTypes: typeof ButtonType = ButtonType;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['institution'] && changes['institution'].currentValue) {
      // Dealing with everything needed to represent the institution behind the operator
      this.institutionArray = this.institution.split('\n');
      this.institutionInlined = this.institution.replaceAll('\n', ' ');
    }

    if (changes['operatorLogoSrc'] && changes['operatorLogoSrc'].currentValue) {
      // Dealing with everything needed to represent the operator behind the app
      if (this.operatorLogoSrc && !this.operatorLogoAlt) {
        throw EMPTY_ALT_ERROR;
      }
    }

    if (changes['appName'] && changes['appName'].currentValue) {
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
}
