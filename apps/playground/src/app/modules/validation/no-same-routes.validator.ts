/**
 * Angular imports
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const noSameRoutesValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const route1 = control.get('tab1Route');
  const route2 = control.get('tab2Route');

  return route1 && route2 && route1.value === route2.value
    ? { noSameRoutes: true }
    : null;
};
