/**
 * Angular imports
 */
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormControlStatus,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * Internal imports
 */
import { failureMessageRequiredWhenHasFailedValidator } from '../input-module/failure-message-required.validator';
import { createTypeSafeTakeUntilDestroyed } from '../../utils';

@Component({
  templateUrl: './upload-module.component.html',
  styleUrls: ['./upload-module.component.scss']
})
export class UploadModuleComponent implements OnInit {

  private untilComponentDestroyed = createTypeSafeTakeUntilDestroyed(
    inject(DestroyRef)
  );

  inputForm = this.formBuilder.group(
    {
      label: ['Ajouter un fichier', Validators.required],
      hint: ['This is a description', Validators.required],
      multiple: false,
      hasFailed: false,
      failureMessage: 'Error message'
    },
    {
      validators: failureMessageRequiredWhenHasFailedValidator
    }
  );

  form = this.formBuilder.group({
    input: ''
  });

  inputFormErrors: Record<string, string> = {};
  selectedFiles: any;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.handleErrors('Please, enter a label for this Component', 'label');
    this.handleErrors(
      'Please, enter a hint message for this Component',
      'hint'
    );
    this.handleErrors(
      'Please, enter a failure message for this Component if the hasFailed attribute is true'
    );
  }

  private handleErrors(errorMsg: string, controlName?: string): void {
    if (controlName) {
      this.inputForm
        ?.get(controlName)
        ?.statusChanges.pipe(this.untilComponentDestroyed())
        .subscribe({
          next: (value: FormControlStatus) => {
            if (value === 'INVALID') {
              this.inputFormErrors[controlName] = errorMsg;
            } else {
              this.inputFormErrors = {};
            }
          }
        });
    } else {
      this.inputForm?.statusChanges
        .pipe(this.untilComponentDestroyed())
        .subscribe({
          next: (value: FormControlStatus) => {
            if (value === 'INVALID') {
              this.inputFormErrors['_form_'] = errorMsg;
            } else {
              this.inputFormErrors = {};
            }
          }
        });
    }
  }
}
