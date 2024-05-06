/**
 * Angular imports
 */
import { Component, Inject, Input, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * 3rd-party imports
 */
import {
  ElementSize,
  ElementAlignment,
  DownloadEnablerDirective,
  DownloadOptions
} from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this link 😡 !!!';
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a value for the link attribute 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';
export const NON_EXISTING_TOP_ANCHOR: string =
  'Please, do not forget to add the id "top" to an element in your DOM, if you plan to use the "Back to Top" feature 😒';

enum TemplateType {
  BACK_TO_TOP,
  INTERNAL,
  EXTERNAL,
  DOWNLOAD
}

@Component({
  selector: 'dsfr-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class DsfrLinkComponent extends DownloadEnablerDirective implements OnChanges  {
  @Input() label: string = '';
  @Input() link: string = '';
  @Input() title: string = '';
  @Input() inline: boolean = true;
  @Input() icon: string | undefined;
  @Input() iconAlignment: ElementAlignment = ElementAlignment.RIGHT;
  @Input() backToTop: boolean = false;
  @Input() size: ElementSize = ElementSize.MEDIUM;
  @Input() override download?: DownloadOptions;

  template: TemplateType = TemplateType.INTERNAL;
  templateType: typeof TemplateType = TemplateType;
  isExternal: boolean = false;
  classes: string = '';

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
  }

  ngOnChanges(): void {
    this.setTemplateType();
    this.setDownloadOptions();

     if (!this.backToTop) {

      if (!this.label) {
        throw EMPTY_LABEL_ERROR;
      }
      if (!this.link) {
        throw EMPTY_LINK_ERROR;
      }

      if (this.isExternal && !this.title) {
        throw EMPTY_TITLE_ERROR;
      }

      this.classes = '';

      if (!this.inline) {
        this.initClasses();
      }
    }
  }

  private setTemplateType(): void {
    this.template = TemplateType.INTERNAL;

    if (this.link.indexOf('http') > -1 && !this.download) {
      this.template = TemplateType.EXTERNAL
    }

    if (this.download) {
      this.template = TemplateType.DOWNLOAD;
      this.inline = false;
    }

    if (this.backToTop) {
      this.template = TemplateType.BACK_TO_TOP;
      this.inline = false;
    }


  }

  private initClasses(): void {
    this.classes += `fr-link fr-link--${this.size}`;

    if (this.download) {
      this.classes += ` fr-link--download`;

      return;
    }

    if (this.backToTop) {
      this.icon = 'arrow-up-fill';
      this.iconAlignment = ElementAlignment.LEFT;
    }

    if (this.icon) {
      this.classes += ` fr-icon-${this.icon} fr-link--icon-${this.iconAlignment}`;
    }
  }

  onBackToTop() {
    const anchor: HTMLElement | null = this.document.getElementById('top');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
      anchor.focus();
    } else {
      throw NON_EXISTING_TOP_ANCHOR;
    }
  }

}
