/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  templateUrl: './stepper-module.component.html',
  styleUrls: ['./stepper-module.component.scss']
})
export class StepperModuleComponent {
  formStepper = this.formBuilder.group({
    stepTitle: 'The step\'s title',
    stepNumber: 1,
    numberOfSteps: 3,
    nextStepTitle: 'The next step\'s title'
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}
}
