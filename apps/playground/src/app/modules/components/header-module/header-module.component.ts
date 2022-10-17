/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

/**
 * TypeScript entities and constants
 */
type FormInlineTrue = {
  inline: FormControl<boolean>;
  label: FormControl<string>;
  link: FormControl<string>;
  title: FormControl<string>;
};

@Component({
  templateUrl: './header-module.component.html',
  styleUrls: ['./header-module.component.scss']
})
export class HeaderModuleComponent implements OnInit, OnDestroy {
  formInlineTrue: FormGroup<FormInlineTrue> | undefined;
  formInlineTrueErrors: Record<string, string> = {};

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formInlineTrue = this.formBuilder.group({
      inline: [{ value: true, disabled: true }],
      label: ['DSFR Link works 😁', Validators.required],
      link: ['https://www.systeme-de-design.gouv.fr/', Validators.required],
      title: 'the documentation about the DSFR'
    });

    this.handleErrors('Please, enter a label for this Component', 'label');
    this.handleErrors('Please, enter a URL for this Component', 'link');
    this.handleErrors(
      'Please, enter a title for this Component if the link is external'
    );
  }

  private handleErrors(errorMsg: string, controlName?: string): void {
    if (controlName) {
      this.formInlineTrue
        ?.get(controlName)
        ?.statusChanges.pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (value: FormControlStatus) => {
            if (value === 'INVALID') {
              this.formInlineTrueErrors[controlName] = errorMsg;
            } else {
              this.formInlineTrueErrors = {};
            }
          }
        });
    } else {
      this.formInlineTrue?.statusChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (value: FormControlStatus) => {
            if (value === 'INVALID') {
              this.formInlineTrueErrors['_form_'] = errorMsg;
            } else {
              this.formInlineTrueErrors = {};
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
