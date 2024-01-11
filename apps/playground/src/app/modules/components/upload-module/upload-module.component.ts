/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControlStatus,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './upload-module.component.html',
  styleUrls: ['./upload-module.component.scss']
})
export class UploadModuleComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  inputForm = this.formBuilder.group({
    label: ['Ajouter un fichier', Validators.required],
    hint: 'This is a description',
    name: 'input-name',
    multiple: false,
    disabled: false,
    hasFailed: false,
    failureMessage: 'Error message',
  });

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

  onFileChange(event: Event) {
    const target = <HTMLInputElement>event.target;
    this.selectedFiles = target.files;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
