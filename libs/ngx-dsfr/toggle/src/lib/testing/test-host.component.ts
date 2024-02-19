/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd party imports
 */
import { ElementAlignment } from '@betagouv/ngx-dsfr';

@Component({
  template: `
    <dsfr-toggle
      [toggleId]="testId"
      [checkedLabel]="testCheckedLabel"
      [unCheckedLabel]="testUnCheckedLabel"
      [label]="testLabel"
      [hint]="testHint"
      [align]="testAlign"
      [disabled]="testDisabled"
      [hideTexts]="testHideTexts">
    </dsfr-toggle>
  `
})
export class TestHostComponent {
  @Input() testId = '';
  @Input() testCheckedLabel = '';
  @Input() testUnCheckedLabel = '';
  @Input() testLabel = '';
  @Input() testAlign: ElementAlignment = ElementAlignment.RIGHT;
  @Input() testHint = '';
  @Input() testDisabled = false;
  @Input() testHideTexts = false;
}
