/**
 * Angular imports
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */

export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this button 😡 !!!';

export enum ButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
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
  @Input() label: string | undefined;
  @Input() disabled?: boolean = false;
  @Input() type?: ButtonType = ButtonType.PRIMARY;
  @Input() size?: ElementSize = ElementSize.MEDIUM;
  @Input() icon?: string | undefined;
  @Input() iconAlignment?: ElementAlignment = ElementAlignment.LEFT;
  @Input() title?: string = '';
  @Input() htmlType?: ButtonHtmlType = ButtonHtmlType.BUTTON;

  @Output() onClick = new EventEmitter<Event>();

  classes: string = '';

  ngOnInit(): void {
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    this.initClasses();
  }

  handleClick(event: Event): void {
    this.onClick.emit(event);
  }

  private initClasses(): void {
    this.classes += `fr-btn fr-btn--${this.size} fr-btn--${this.type}`;

    if (this.icon) {
      this.classes += ` ${this.icon} fr-btn--icon-${this.iconAlignment}`;
    }
  }
}
