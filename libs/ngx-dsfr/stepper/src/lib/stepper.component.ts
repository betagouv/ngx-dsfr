/**
 * Angular imports
 */
import { Component, Input, OnChanges } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a title for the current step of this stepper 😡 !!!';
export const EMPTY_NEXT_STEP_ERROR: string =
  'You MUST provide a title for the next step of this stepper 😡 !!!';
export const EMPTY_STEPS_ERROR: string =
  'You MUST provide the number of steps for this stepper 😡 !!!';

@Component({
  selector: 'dsfr-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class DsfrStepperComponent implements OnChanges {
  @Input({required: true}) stepTitle!: string;
  @Input() stepNumber = 1;
  @Input({required: true}) numberOfSteps!: number;
  @Input() nextStepTitle = '';

  ngOnChanges(): void {
    if (!this.stepTitle) {
      throw EMPTY_TITLE_ERROR;
    }
    if (!this.numberOfSteps) {
      throw EMPTY_STEPS_ERROR;
    }
    if (this.stepNumber !== this.numberOfSteps && !this.nextStepTitle) {
      throw EMPTY_NEXT_STEP_ERROR;
    }
  }
}
