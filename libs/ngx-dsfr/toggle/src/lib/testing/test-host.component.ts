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
      [id]="testId"
      [checkedLabel]="testCheckedLabel"
      [unCheckedLabel]="testUnCheckedLabel"
      [label]="testLabel"
      [hint]="testHint"
      [align]="testAlign"
      [disabled]="testDisabled">
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
}
