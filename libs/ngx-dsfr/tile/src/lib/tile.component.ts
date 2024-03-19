/**
 * Angular imports
 */
import { Component, Input, OnChanges } from '@angular/core';

/**
 * 3rd-party imports
 */
import { Breakpoint } from '@betagouv/ngx-dsfr';

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
export class DsfrTileComponent implements OnChanges {

  @Input() align: TemplateAlign = 'vertical';
  @Input() breakpoint: Breakpoint | undefined;
  @Input() link: string | undefined;
  @Input() title: string | undefined;
  @Input() image: string | undefined;
  @Input() description: string | undefined;
  @Input() detail: string | undefined;
  @Input() download: boolean = false;

  classes: string = '';
  template: TemplateType = TemplateType.INTERNAL;
  templateType: typeof TemplateType = TemplateType;

  ngOnChanges(): void {
    this.initClasses();

    if (!this.title) {
      throw EMPTY_TITLE_ERROR;
    }

    if (!this.link) {
      throw EMPTY_LINK_ERROR;
    }

    this.setTemplateType();
  }

  private setTemplateType(): void {
    this.template = TemplateType.INTERNAL;

    if (
      this.link &&
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
    this.classes = `fr-tile fr-enlarge-link fr-tile--${this.align}`;
    if (this.breakpoint) {
      this.classes += `-${this.breakpoint}`;
    }

    if (this.download) {
      this.classes += ' fr-tile--download'
    }
  }

}
