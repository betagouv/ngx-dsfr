/**
 * Angular imports
 */
import { Component, Input, OnChanges } from '@angular/core';

/**
 * 3rd-party imports
 */
import { Breakpoint, DownloadEnablerDirective, DownloadOptions, ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a value for the link attribute 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';
export type TemplateAlign = 'horizontal' | 'vertical';
enum TemplateType {
  INTERNAL,
  EXTERNAL,
  DOWNLOAD
}

@Component({
  selector: 'dsfr-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class DsfrTileComponent extends DownloadEnablerDirective implements OnChanges {

  @Input() align: TemplateAlign = 'vertical';
  @Input() size: ElementSize = ElementSize.MEDIUM;
  @Input() breakpoint?: Breakpoint;
  @Input({ required: true }) link!: string;
  @Input({ required: true }) title!: string;
  @Input() image?: string;
  @Input() description?: string;
  @Input() detail?: string;
  @Input() override download?: DownloadOptions;

  classes: string = '';
  template: TemplateType = TemplateType.INTERNAL;
  templateType: typeof TemplateType = TemplateType;

  ngOnChanges(): void {
    this.setTemplateType();
    this.setDownloadOptions();

    if (!this.title) {
      throw EMPTY_TITLE_ERROR;
    }

    if (!this.link) {
      throw EMPTY_LINK_ERROR;
    }

    this.classes = '';

    this.initClasses();
  }

  private setTemplateType(): void {
    this.template = TemplateType.INTERNAL;

    if (
      this.link.indexOf('http') > -1 &&
      !this.download
    ) {
      this.template = TemplateType.EXTERNAL
    }

    if (this.download) {
      this.template = TemplateType.DOWNLOAD
    }
  }

  private initClasses(): void {
    this.classes = `fr-tile fr-enlarge-link fr-tile--${this.size} fr-tile--${this.align}`;

    if (this.breakpoint) {
      const breakpointAlignment =
        this.align === 'horizontal'
          ? 'fr-tile--vertical'
          : 'fr-tile--horizontal';
      this.classes += ` ${breakpointAlignment}@${this.breakpoint}`;
    }

    if (this.download) {
      this.classes += ' fr-tile--download';
    }
  }

}
