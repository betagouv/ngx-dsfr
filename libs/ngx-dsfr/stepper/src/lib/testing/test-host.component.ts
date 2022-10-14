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
  @Input() testStepTitle: string | undefined = undefined;
  @Input() testStepNumber: number | undefined = undefined;
  @Input() testNumberOfSteps: number | undefined = undefined;
  @Input() testNextStepTitle: string | undefined = undefined;
}
