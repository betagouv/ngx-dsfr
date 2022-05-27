/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this link 😡 !!!';
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a value for the link attribute 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';

@Component({
  selector: 'dsfr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class DsfrLinkComponent implements OnInit {
  @Input() label: string = '';
  @Input() link: string = '';
  @Input() title: string = '';

  isExternal: boolean = false;

  ngOnInit(): void {
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    if (!this.link) {
      throw EMPTY_LINK_ERROR;
    }

    this.isExternal = this.link.indexOf('http') > -1;
    if (this.isExternal && !this.title) {
      throw EMPTY_TITLE_ERROR;
    }
  }
}
