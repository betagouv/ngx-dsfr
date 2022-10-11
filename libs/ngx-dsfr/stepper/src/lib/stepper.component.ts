/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a title for the step for this stepper 😡 !!!';
export const EMPTY_NEXT_STEP_ERROR: string =
  'You MUST provide a title for the next step for this stepper 😡 !!!';
export const EMPTY_STEPS_ERROR: string =
  'You MUST provide the number of steps for the this stepper 😡 !!!';

@Component({
  selector: 'dsfr-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class DsfrStepperComponent implements OnInit {
  @Input() stepSubtitle = '';
  @Input() stepTitle = '';
  @Input() stepNumber = 1;
  @Input() numberOfSteps!: number;
  @Input() nextStepTitle = '';
  @Input() nextStepSubTitle = '';

  ngOnInit(): void {
    if (!this.stepTitle) {
      throw EMPTY_TITLE_ERROR;
    }
    if (!this.numberOfSteps) {
      throw EMPTY_STEPS_ERROR;
    }
    if (this.stepNumber !== this.numberOfSteps && !this.nextStepTitle) {
      throw EMPTY_NEXT_STEP_ERROR;
    }
    if (!this.stepSubtitle) {
      this.stepSubtitle = `Étape ${this.stepNumber} sur ${this.numberOfSteps}`;
    }
    if (this.stepNumber !== this.numberOfSteps && !this.nextStepSubTitle) {
      this.nextStepSubTitle = 'Étape suivante :';
    }
  }
}
