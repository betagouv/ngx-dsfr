/**
 * Angular imports
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const titleRequiredWhenExternalValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const link = control.get('link');
  const title = control.get('title');

  return link &&
    title &&
    link.value.toString().startsWith('http') &&
    !title.value
    ? { titleRequiredWhenExternal: true }
    : null;
};
