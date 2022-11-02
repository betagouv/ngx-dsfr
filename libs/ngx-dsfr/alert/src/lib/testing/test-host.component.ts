/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { AlertType } from '../alert.component';

@Component({
  template: `
    <dsfr-alert
      [title]="testTitle"
      [type]="testType"
      [description]="testDescription"
      [size]="testSize"
      [hasCloseButton]="testHasCloseButton"
    ></dsfr-alert>
  `
})
export class TestHostComponent {
  @Input() testTitle: string | undefined;
  @Input() testType!: AlertType;
  @Input() testDescription: string = '';
  @Input() testSize: Omit<ElementSize, 'LARGE'> = ElementSize.MEDIUM;
  @Input() testHasCloseButton: boolean = false;
}
