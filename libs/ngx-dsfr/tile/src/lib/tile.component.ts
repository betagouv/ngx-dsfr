/**
 * Angular imports
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Breakpoint, TemplateAlignment } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a value for the link attribute 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';

enum TemplateType {
  INTERNAL,
  EXTERNAL
}

@Component({
  selector: 'dsfr-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class DsfrTileComponent implements OnChanges {

  @Input() align: TemplateAlignment = TemplateAlignment.VERTICAL;
  @Input() breakpoint: Breakpoint | undefined;
  @Input() link: string | undefined;
  @Input() title: string | undefined;
  @Input() image: string | undefined;
  @Input() description: string | undefined;

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

    this.template = this.link.indexOf('http') > -1
      ? TemplateType.EXTERNAL
      : TemplateType.INTERNAL;
  }

  private initClasses(): void {
    this.classes = `fr-tile fr-enlarge-link fr-tile--${this.align}`;
    if (this.breakpoint) {
      this.classes += ` fr-tile--${this.breakpoint}`;
    }
  }

}
