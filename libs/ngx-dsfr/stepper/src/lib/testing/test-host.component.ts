/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-stepper
      [stepTitle]="testStepTitle"
      [stepNumber]="testStepNumber"
      [numberOfSteps]="testNumberOfSteps"
      [nextStepTitle]="testNextStepTitle"
    ></dsfr-stepper>
  `
})
export class TestHostComponent {
  @Input() testStepTitle!: string;
  @Input() testStepNumber: number = 1;
  @Input() testNumberOfSteps!: number;
  @Input() testNextStepTitle!: string;
}
