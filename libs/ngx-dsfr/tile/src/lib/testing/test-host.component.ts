/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd party imports
 */
import { Breakpoint, TemplateAlignment } from '@betagouv/ngx-dsfr';

@Component({
  template: `
    <dsfr-tile
      [link]="testLink"
      [title]="testTitle"
      [description]="testDescription"
      [breakpoint]="testBreakpoint"
      [align]="testAlign"
      [image]="testImage">
    </dsfr-tile>
  `
})
export class TestHostComponent {
  @Input() testLink: string = '';
  @Input() testTitle: string = '';
  @Input() testDescription: string = '';
  @Input() testBreakpoint: Breakpoint = 'md';
  @Input() testAlign: TemplateAlignment = TemplateAlignment.VERTICAL;
  @Input() testImage: string = '';
}
