/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */

@Component({
  template: `
    <dsfr-upload
      >
    </dsfr-upload>
  `
})
export class TestHostComponent {
  @Input() testAppName: string = '';
}
