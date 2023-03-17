/**
 * Angular imports
 */
import { Component, Input, OnChanges } from '@angular/core';
import { ElementSize, ThemeColor } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_AND_THEME_ERROR: string =
  'You MUST provide a label AND a theme for this badge 😡 !!!';

export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this badge 😡 !!!';

export const EMPTY_THEME_ERROR: string =
  'You MUST provide a theme for this badge 😡 !!!';

@Component( {
  selector: 'dsfr-badge',
  templateUrl: './badge.component.html',
  styleUrls: [ './badge.component.scss' ]
} )
export class DsfrBadgeComponent implements OnChanges {

  @Input() label: string | undefined;
  @Input() theme: ThemeColor | undefined;
  @Input() noIcon?: boolean = false;
  @Input() size?: Omit<ElementSize, 'LARGE'> = ElementSize.MEDIUM;

  classes: string = '';

  ngOnChanges(): void {

    if ( !this.label && !this.theme ) {
      throw EMPTY_LABEL_AND_THEME_ERROR;
    }

    if ( !this.label ) {
      throw EMPTY_LABEL_ERROR;
    }

    if ( !this.theme ) {
      throw EMPTY_THEME_ERROR;
    }

    this.initClasses();
  }

  private initClasses(): void {
    let classes = `fr-badge fr-badge--${this.size} fr-badge--${this.theme}`;

    if ( this.noIcon ) {
      classes += ` fr-badge--no-icon`;
    }
    this.classes = classes;
  }
}
