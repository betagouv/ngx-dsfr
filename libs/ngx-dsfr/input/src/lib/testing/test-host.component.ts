/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-input
      [label]="testLabel"
      [description]="testDescription"
      [placeholder]="testPlaceholder">
    </dsfr-input>
  `
})
export class TestHostComponent {
  @Input() testLabel: string = '';
  @Input() testDescription: string = '';
  @Input() testPlaceholder: string = 'Entrez votre texte';

}
