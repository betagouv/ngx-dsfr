/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';
import { AlertType, ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a title for this alert 😡 !!!';
export const EMPTY_TYPE_ERROR: string =
  'You MUST provide a type for this alert 😡 !!!';

@Component({
  selector: 'dsfr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class DsfrAlertComponent implements OnInit {
  @Input() title!: string;
  @Input() type!: AlertType;
  @Input() description = '';
  @Input() hasCloseButton = false;
  @Input() size: Omit<ElementSize, 'LARGE'> = ElementSize.MEDIUM;

  classes: string = '';
  isSmall = false;
  isClosed = false;

  ngOnInit (): void {
    if (!this.title) {
      throw EMPTY_TITLE_ERROR;
    }
    if (!this.type) {
      throw EMPTY_TYPE_ERROR;
    }
    this.isSmall = this.size === ElementSize.SMALL;

    this.initClasses();
  }

  private initClasses (): void {
    this.classes += `fr-alert fr-alert--${this.type}`;

    if (this.size === ElementSize.SMALL) {
      this.classes += ` fr-alert--${this.size}`;
    }
  }

  closeAlert (): void {
    this.isClosed = true;
  }
}
