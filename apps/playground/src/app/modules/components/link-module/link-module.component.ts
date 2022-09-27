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
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';
import { Subject, takeUntil } from 'rxjs';

/**
 * TypeScript entities and constants
 */
type FormInlineTrue = {
  inline: FormControl<boolean>;
  label: FormControl<string>;
};

@Component({
  templateUrl: './link-module.component.html',
  styleUrls: ['./link-module.component.scss']
})
export class LinkModuleComponent implements OnInit, OnDestroy {
  iconAlignment: typeof ElementAlignment = ElementAlignment;
  linkSize: typeof ElementSize = ElementSize;
  formInlineTrue: FormGroup<FormInlineTrue> | undefined;
  formInlineTrueErrors:
    | Partial<Record<keyof FormInlineTrue, string>>
    | undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formInlineTrue = this.formBuilder.group({
      inline: [{ value: true, disabled: true }],
      label: ['DSFR Link works 😁', Validators.required]
    });

    this.formInlineTrue
      .get('label')
      ?.statusChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value: FormControlStatus) => {
          if (value === 'INVALID') {
            this.formInlineTrueErrors = {
              label: 'Please, enter a label for this Component'
            };
          } else {
            this.formInlineTrueErrors = undefined;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
