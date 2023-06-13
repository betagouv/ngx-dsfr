/**
 * Angular imports
 */
import { Component, DestroyRef, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { createErrorHandling } from '../../validation/handle-errors';

@Component({
  templateUrl: './stepper-module.component.html',
  styleUrls: ['./stepper-module.component.scss']
})
export class StepperModuleComponent {
  stepperFormErrors: Record<string, string> = {};

  formStepper = this.formBuilder.group({
    stepTitle: ['The step\'s title', Validators.required],
    stepNumber: 1,
    numberOfSteps: [3, Validators.required],
    nextStepTitle: 'The next step\'s title'
  });

  private readonly handleErrors = createErrorHandling(inject(DestroyRef));

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.handleRequiredErrors();
  }

  private handleRequiredErrors(): void {
    this.handleErrors({
      form: this.formStepper,
      controlName: 'stepTitle',
      formErrors: this.stepperFormErrors,
      error: 'Please, enter a title for the current step'
    });
    this.handleErrors({
      form: this.formStepper,
      controlName: 'numberOfSteps',
      formErrors: this.stepperFormErrors,
      error: 'Please, enter the number of steps for this stepper'
    });
  }
}
