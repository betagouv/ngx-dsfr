/**
 * Angular imports
 */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';

/**
 * 3rd-party imports
 */
import { ElementSize, TemplateAlignment, ThemeColor } from '@betagouv/ngx-dsfr';
import { TagType } from '@betagouv/ngx-dsfr/tag';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this input 😡 !!!';
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a link for this input 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a linkTitle for this input 😡 !!!';

export enum CardBackground {
  GREY = 'grey',
  NO_BACKGROUND = 'no-background'
}

export enum CardBorder {
  NO_BORDER = 'no-border',
  SHADOW = 'shadow'
}

export enum CardImageRatio {
  TIER = 'tier',
  HALF = 'half'
}

export interface DsfrBadge {
  label: string;
  theme: ThemeColor;
  noIcon?: boolean;
  size?: Omit<ElementSize, 'LARGE'>;
}

export interface DsfrTag {
  label: string;
  icon?: string;
  size?: Omit<ElementSize, ElementSize.LARGE>;
  link?: string;
  type?: TagType;
  isSelected?: boolean;
}

@Component({
  selector: 'dsfr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DsfrCardComponent implements OnChanges {

  // Content Inputs
  @Input() label: string = '';
  @Input() image: string | undefined;
  @Input() imageAlt: string = '';
  @Input() description: string | undefined;
  @Input() detail: string | undefined;
  @Input() detailIcon: string | undefined;
  @Input() bottomDetail: string | undefined;
  @Input() bottomDetailIcon: string | undefined;
  @Input() link: string | undefined;
  @Input() linkTitle: string | undefined;

  // Design Inputs
  @Input() align: TemplateAlignment = TemplateAlignment.VERTICAL;
  @Input() border: CardBorder | undefined;
  @Input() background: CardBackground | undefined;
  @Input() imageRatio: CardImageRatio | undefined;
  @Input() size: Omit<ElementSize, "MD"> = ElementSize.LARGE;

  // Structural Inputs
  @Input() download: boolean = false;
  @Input() hasFooter: boolean = false;

  // Others components Inputs
  @Input() badges: DsfrBadge[] | undefined;
  @Input() topBadges: boolean = false;
  @Input() tags: DsfrTag[] | undefined;

  @Output() readonly cardSelected: EventEmitter<string> = new EventEmitter();

  classes: {} = {};
  detailClass: string = '';
  bottomDetailClass: string = '';

  protected readonly ElementSize = ElementSize;

  ngOnChanges(): void {
    this.initClasses();

    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }

    if (!this.linkTitle) {
      throw EMPTY_TITLE_ERROR;
    }

    if (!this.link) {
      throw EMPTY_LINK_ERROR;
    }
  }

  private initClasses(): void {
    this.classes = {
      'fr-card': true,
      'fr-enlarge-link': !this.hasFooter,
      'fr-card--horizontal': this.align === TemplateAlignment.HORIZONTAL,
      'fr-card--sm': this.size === 'SM',
      'fr-card--lg': this.size === 'LG',
      'fr-card--download': this.download,
      'fr-card--no-border': this.border === CardBorder.NO_BORDER,
      'fr-card--shadow': this.border === CardBorder.SHADOW,
      'fr-card--no-background': this.background === CardBackground.NO_BACKGROUND,
      'fr-card--grey': this.background === CardBackground.GREY,
      'fr-card--horizontal-tier': this.imageRatio === CardImageRatio.TIER && this.align === TemplateAlignment.HORIZONTAL,
      'fr-card--horizontal-half': this.imageRatio === CardImageRatio.HALF && this.align === TemplateAlignment.HORIZONTAL,
      'fr-card--no-arrow': this.hasFooter
    };

    this.detailClass = 'fr-card__detail';
    if (this.detailIcon) {
      this.detailClass += ` ${this.detailIcon}`;
    }

    this.bottomDetailClass = 'fr-card__detail';
    if (this.bottomDetailIcon) {
      this.bottomDetailClass += ` ${this.bottomDetailIcon}`;
    }
  }
}
