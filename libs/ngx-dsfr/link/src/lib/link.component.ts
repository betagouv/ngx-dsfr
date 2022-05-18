/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this link 😡 !!!';
export const EMPTY_HREF_ERROR: string =
  'You MUST provide a value for the href attribute 😡 !!!';

@Component({
  selector: 'dsfr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class DsfrLinkComponent implements OnInit {
  @Input() label: string = '';
  @Input() link: string = '';

  isExternal: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    if (!this.link) {
      throw EMPTY_HREF_ERROR;
    }

    this.isExternal = this.link.indexOf('http') > -1;
  }
}
