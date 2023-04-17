/**
 * Angular imports
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const failureMessageRequiredWhenHasFailedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const hasFailed = control.get('hasFailed');
  const failureMessage = control.get('failureMessage');

  return hasFailed &&
    failureMessage &&
    hasFailed.value &&
    !failureMessage.value
    ? { failureMessageRequiredWhenHasFailed: true }
    : null;
};
