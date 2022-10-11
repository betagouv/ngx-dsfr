/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-stepper
      [stepSubtitle]="testStepSubtitle"
      [stepTitle]="testStepTitle"
      [stepNumber]="testStepNumber"
      [numberOfSteps]="testNumberOfSteps"
      [nextStepTitle]="testNextStepTitle"
      [nextStepSubTitle]="testNextStepSubTitle"
    ></dsfr-stepper>
  `
})
export class TestHostComponent {
  @Input() testStepSubtitle = "";
  @Input() testStepTitle = "";
  @Input() testStepNumber = 1;
  @Input() testNumberOfSteps = 3;
  @Input() testNextStepTitle = "";
  @Input() testNextStepSubTitle = "";
}
