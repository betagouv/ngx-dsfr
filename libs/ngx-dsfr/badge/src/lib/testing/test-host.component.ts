/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementSize, ThemeColor } from '@betagouv/ngx-dsfr';

@Component({
  template: `
    <dsfr-badge
      [label]="testLabel"
      [theme]="testTheme"
      [noIcon]="testNoIcon"
      [size]="testSize"
    ></dsfr-badge>
  `
})
export class TestHostComponent {
  @Input() testLabel: string | undefined;
  @Input() testTheme: ThemeColor | undefined;
  @Input() testNoIcon?: boolean = false;
  @Input() testSize?: Omit<ElementSize, "LARGE"> = ElementSize.MEDIUM;
}
