/**
 * Angular imports
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * 3rd-party imports
 */
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_AND_ICON_ERROR: string =
  'You MUST provide a label and/or an icon for this button 😡 !!!';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  TERTIARY_NO_OUTLINE = 'tertiary-no-outline',
  CLOSE = 'close'
}

export enum ButtonHtmlType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
}

@Component({
  selector: 'dsfr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class DsfrButtonComponent implements OnInit {
  @Input() label?: string | undefined;
  @Input() disabled?: boolean = false;
  @Input() type?: ButtonType = ButtonType.PRIMARY;
  @Input() size?: ElementSize = ElementSize.MEDIUM;
  @Input() icon?: string | undefined;
  @Input() iconAlignment?: ElementAlignment = ElementAlignment.LEFT;
  @Input() title?: string;
  @Input() htmlType?: ButtonHtmlType = ButtonHtmlType.BUTTON;
  @Input() ariaControls?: string;

  @Output() click = new EventEmitter<Event>();

  classes: string = '';

  ngOnInit(): void {
    if (!this.label && !this.icon) {
      throw EMPTY_LABEL_AND_ICON_ERROR;
    }

    if (!this.title) {
      this.title = this.label || '';
    }

    this.initClasses();
  }

  onClick(event: Event): void {
    this.click.emit(event);
  }

  private initClasses(): void {
    this.classes += `fr-btn fr-btn--${this.size} fr-btn--${this.type}`;

    if (this.icon) {
      this.classes += ` fr-icon-${this.icon} `;

      if (this.label) {
        this.classes += ` fr-btn--icon-${this.iconAlignment} `;
      }
    }
  }
}
