/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import { ButtonHtmlType, ButtonType } from '../button.component';

export enum ElementAlignment {
  RIGHT = 'right',
  LEFT = 'left'
}

@Component({
  template: `
    <dsfr-button
      [label]="testLabel"
      [disabled]="testDisabled"
      [title]="testTitle"
      [type]="testType"
      [icon]="testIcon"
      [iconAlignment]="testIconAlignment"
      [htmlType]="testhtmlType">
    </dsfr-button>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testType: ButtonType = ButtonType.PRIMARY;
  @Input() testTitle: string = '';
  @Input() testDisabled: boolean = true;
  @Input() testIcon: string | undefined;
  @Input() testIconAlignment?: ElementAlignment = ElementAlignment.RIGHT;
  @Input() testhtmlType: ButtonHtmlType = ButtonHtmlType.BUTTON;
}
