/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControlStatus, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { InputType } from '@betagouv/ngx-dsfr/input';
import { Subject, takeUntil } from 'rxjs';

/**
 * Internal imports
 */
import { failureMessageRequiredWhenHasFailedValidator } from './failure-message-required.validator';

@Component({
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss']
})
export class InputModuleComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  inputForm = this.formBuilder.group({
    label: ['This is a label', Validators.required],
    type: ['text' as InputType, Validators.required],
    placeholder: ['This is a placeholder', Validators.required],
    hint: ['This is a description', Validators.required],
    icon: ['', Validators.required],
    disabled: [false, Validators.required],
    hasFailed: [false, Validators.required],
    hasSucceeded: [false, Validators.required],
    failureMessage: ['Error message', Validators.required],
    successMessage: ['Success message', Validators.required]
  },
  {
    validators: failureMessageRequiredWhenHasFailedValidator
  });
  inputFormErrors: Record<string, string> = {};
  form: FormGroup | undefined;

  possibleInputTypes: Record<string, string> = {
    'text': 'text',
    'textarea': 'textarea',
    'date': 'date',
    'number': 'number'
  };

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {

    this.form = this.formBuilder.group({
      input: ''
    });

    this.handleErrors('Please, enter a label for this Component', 'label');
    this.handleErrors(
      'Please, enter a failure meessage for this Component if the hasFailed attribute is true'
    );
  }

  private handleErrors(errorMsg: string, controlName?: string): void {
    if (controlName) {
      this.inputForm
        ?.get(controlName)
        ?.statusChanges.pipe(takeUntil(this.unsubscribe$))
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
        .pipe(takeUntil(this.unsubscribe$))
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
