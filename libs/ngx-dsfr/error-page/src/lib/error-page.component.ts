/**
 * Angular imports
 */
import { Component, ContentChild, Input, OnChanges } from '@angular/core';
import { ElementSize, ElementAlignment } from '@betagouv/ngx-dsfr';
import { DsfrErrorPageDescriptionDirective, DsfrErrorPageSubDescriptionDirective  } from './error-page-content.directive';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this link 😡 !!!';
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a value for the link attribute 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';

export type ErrorStatus = '404' | '500' | '503';

@Component({
  selector: 'dsfr-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class DsfrErrorPageComponent implements OnChanges {

  @Input() title: string = '';
  @Input() status: ErrorStatus = '404';
  @Input() homeLink: string = '';
  @Input() contactUsLink: string = '';

  @ContentChild(DsfrErrorPageDescriptionDirective) description!: DsfrErrorPageDescriptionDirective;
  @ContentChild(DsfrErrorPageSubDescriptionDirective) subDescription!: DsfrErrorPageSubDescriptionDirective;

  ngOnChanges(): void {

  }
}
