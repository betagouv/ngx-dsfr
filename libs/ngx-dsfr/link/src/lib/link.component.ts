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

export enum IconAlignment {
  RIGHT = 'right',
  LEFT = 'left'
}

export enum LinkSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg'
}

enum TemplateType {
  BACK_TO_TOP,
  INTERNAL,
  EXTERNAL
}

@Component({
  selector: 'dsfr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class DsfrLinkComponent implements OnInit {
  @Input() label: string = '';
  @Input() link: string = '';
  @Input() title: string = '';
  @Input() inline: boolean = true;
  @Input() icon: string | undefined;
  @Input() iconAlignment: IconAlignment = IconAlignment.RIGHT;
  @Input() backToTop: boolean = false;
  @Input() size: LinkSize = LinkSize.MEDIUM;

  template: TemplateType = TemplateType.INTERNAL;
  templateType: typeof TemplateType = TemplateType;
  isExternal: boolean = false;
  classes: string = '';

  ngOnInit(): void {
    if (this.backToTop) {
      this.template = TemplateType.BACK_TO_TOP;
    } else {
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

      this.template = this.isExternal
        ? TemplateType.EXTERNAL
        : TemplateType.INTERNAL;

      if (!this.inline) {
        this.initClasses();
      }
    }
  }

  private initClasses(): void {
    this.classes += `fr-link fr-link--${this.size}`;

    if (this.icon) {
      this.classes += ` fr-icon-${this.icon} fr-link--icon-${this.iconAlignment}`;
    }
  }
}
