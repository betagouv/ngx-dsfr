/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd-party imports
 */
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import { ButtonHtmlType, ButtonType } from '../button.component';

@Component({
  template: `
    <dsfr-button
      [label]="testLabel"
      [disabled]="testDisabled"
      [title]="testTitle"
      [type]="testType"
      [size]="testSize"
      [icon]="testIcon"
      [iconAlignment]="testIconAlignment"
      [htmlType]="testhtmlType">
    </dsfr-button>
  `
})
export class TestHostComponent {
  @Input() testLabel?: string;
  @Input() testType: ButtonType = ButtonType.PRIMARY;
  @Input() testSize: ElementSize = ElementSize.MEDIUM;
  @Input() testTitle?: string;
  @Input() testDisabled: boolean = true;
  @Input() testIcon: string | undefined;
  @Input() testIconAlignment?: ElementAlignment = ElementAlignment.RIGHT;
  @Input() testhtmlType: ButtonHtmlType = ButtonHtmlType.BUTTON;
}
