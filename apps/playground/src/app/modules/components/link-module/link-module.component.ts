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
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';
import { Subject, takeUntil } from 'rxjs';

/**
 * Internal imports
 */
import { titleRequiredWhenExternalValidator } from '../../validation/title-required-when-external.validator';

@Component({
  templateUrl: './link-module.component.html',
  styleUrls: ['./link-module.component.scss']
})
export class LinkModuleComponent implements OnInit, OnDestroy {
  iconAlignment: typeof ElementAlignment = ElementAlignment;
  linkSize: typeof ElementSize = ElementSize;
  formInlineTrue = this.formBuilder.group(
    {
      inline: [{ value: true, disabled: false }],
      label: ['DSFR Link works 😁', Validators.required],
      link: ['https://www.systeme-de-design.gouv.fr/', Validators.required],
      backToTop: false,
      download: false,
      detail: '',
      title: 'the documentation about the DSFR'
    },
    { validators: titleRequiredWhenExternalValidator }
  );
  formInlineTrueErrors: Record<string, string> = {};

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.handleErrors('Please, enter a label for this Component', 'label');
    this.handleErrors('Please, enter a URL for this Component', 'link');
    this.handleErrors('Please, enter a title for this Component if the link is external');
  }

  private handleErrors(errorMsg: string, controlName?: string): void {
    if (controlName) {
      this.formInlineTrue
        ?.get(controlName)
        ?.statusChanges
        .pipe(takeUntil(this.unsubscribe$))
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
