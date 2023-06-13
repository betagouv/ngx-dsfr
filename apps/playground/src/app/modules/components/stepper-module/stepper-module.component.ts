/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './stepper-module.component.html',
  styleUrls: ['./stepper-module.component.scss']
})
export class StepperModuleComponent {
  formStepper = this.formBuilder.group({
    stepTitle: ['The step\'s title', Validators.required],
    stepNumber: 1,
    numberOfSteps: [3, Validators.required],
    nextStepTitle: 'The next step\'s title'
  });

  constructor(private formBuilder: NonNullableFormBuilder) {}
}
