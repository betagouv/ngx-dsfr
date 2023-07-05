/**
 * Angular imports
 */
import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';

/**
 * 3rd-party imports
 */
import { ButtonType } from '@betagouv/ngx-dsfr/button';
import { DsfrNavigationComponent } from '@betagouv/ngx-dsfr/navigation';
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import { DsfrHeaderActionDirective } from './header-action.directive';

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
export class DsfrHeaderComponent implements OnInit, OnChanges {
  @Input() institution: string = 'République\nFrançaise';
  @Input() operatorLogoSrc: string | undefined;
  @Input() operatorLogoAlt: string | undefined;
  @Input() appName: string | undefined;
  @Input() appDescription: string | undefined;
  @Input() link: string = '/';
  @Input() searchBar: boolean = false;
  @Input() searchBarAutoCompletion: boolean = false;
  @Input() miniMobileHeader: boolean = false;

  @Output() searchQuerySubmitted = new EventEmitter<string>();

  @ContentChildren(DsfrHeaderActionDirective) actions!: QueryList<DsfrHeaderActionDirective>;
  @ContentChild(DsfrNavigationComponent) nav?: DsfrNavigationComponent;

  institutionArray!: string[];
  institutionInlined!: string;
  appLinkTitle: string | undefined;
  isMobileMenuOpened: boolean = false;
  buttonTypes: typeof ButtonType = ButtonType;
  elementSize: typeof ElementSize = ElementSize;
  isSearchBarOpened: boolean = false;

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

  private handleInstitution(): void {
    // Dealing with everything needed to represent the institution behind the operator
    this.institutionArray = this.institution.split('\n');
    this.institutionInlined = this.institution.replaceAll('\n', ' ');
  }

  onSearchQuerySubmitted(value: string): void {
    this.searchQuerySubmitted.emit(value);
  }
}
