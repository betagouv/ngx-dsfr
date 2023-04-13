/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlStatus, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * Angular imports
 */
import { InputType } from '@betagouv/ngx-dsfr/input';
import { Subject, takeUntil } from 'rxjs';

interface FormInput {
  label: FormControl<string>,
  type: FormControl<InputType>,
  placeholder: FormControl<string>,
  hint: FormControl<string>,
  icon: FormControl<string>,
  disabled: FormControl<boolean>,
  hasFailed: FormControl<boolean>,
  hasSucceeded: FormControl<boolean>,
  failureMessage: FormControl<string>,
  successMessage: FormControl<string>,
}

@Component({
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss']
})
export class InputModuleComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();

  inputForm: FormGroup | undefined;
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
    this.inputForm = this.formBuilder.group({
      label: ['This is a label', Validators.required],
      type: ['text', Validators.required],
      placeholder: ['This is a placeholder', Validators.required],
      hint: ['This is a description', Validators.required],
      icon: ['', Validators.required],
      disabled: [false, Validators.required],
      hasFailed: [false, Validators.required],
      hasSucceeded: [false, Validators.required],
      failureMessage: ['Error message', Validators.required],
      successMessage: ['Success message', Validators.required],
    });

    this.form = this.formBuilder.group({
      input: ''
    });


    this.handleErrors('Please, enter a label for this Component', 'label');
    this.handleErrors('Please, enter a failure meessage for this Component', 'failureMessage');
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
}
