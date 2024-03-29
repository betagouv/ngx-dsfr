/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

@Component({
  template: `
    <dsfr-search-bar
      [id]="testId"
      [label]="testLabel"
      [autocomplete]="testAutocomplete"
      [size]="testSize"
      [displayNoResultMessage]="testdisplayNoResultMessage"
      [minCharacterForSearch]="testminCharacterForSearch"
      [placeholder]="testPlaceholder">
    </dsfr-search-bar>
  `
})
export class TestHostComponent {
  @Input() testLabel: string | undefined;
  @Input() testId: string | undefined;
  @Input() testAutocomplete: boolean = false;
  @Input() testdisplayNoResultMessage: boolean = true;
  @Input() testSize: ElementSize = ElementSize.MEDIUM;
  @Input() testPlaceholder: string = '';
  @Input() testminCharacterForSearch: number = 3;
}
