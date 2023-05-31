/**
 * Angular imports
 */
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlStatus, FormGroup } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export interface FormValidation {
  form: FormGroup;
  formErrors: Record<string, string>;
  controlName?: string;
  error: string;
}

export type ErrorHandlingFn = (options: FormValidation) => void;

export function createErrorHandling(destroyRef: DestroyRef): ErrorHandlingFn {
  return (options: FormValidation) => {
    if (options.controlName) {
      options.form
        ?.get(options.controlName)
        ?.statusChanges.pipe(takeUntilDestroyed(destroyRef))
        .subscribe({
          next: (status: FormControlStatus) => {
            if (status === 'INVALID') {
              options.formErrors[options.controlName!] = options.error;
            } else {
              delete options.formErrors[options.controlName!];
            }
          }
        });
    } else {
      options.form?.statusChanges
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe({
          next: (status: FormControlStatus) => {
            if (status === 'INVALID') {
              options.formErrors['_form_'] = options.error;
            } else {
              delete options.formErrors['_form_'];
            }
          }
        });
    }
  };
}
