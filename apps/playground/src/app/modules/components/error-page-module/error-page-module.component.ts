/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControlStatus,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { ErrorStatus } from '@betagouv/ngx-dsfr/error-page';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';


@Component({
  templateUrl: './error-page-module.component.html',
  styleUrls: ['./error-page-module.component.scss']
})
export class ErrorPageModuleComponent implements OnInit, OnDestroy {
  formErrorPage = this.formBuilder.group({
    title: ['Page non trouvée', [Validators.required]],
    status: ['404' as ErrorStatus, [Validators.required]],
  });
  possibleStatusError: Record<string, string> = {
    '404': '404',
    '500': '500',
    '503': '503'
  };
  errors: Record<string, string> = {
    formErrorPage: ''
  };

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.handleTitleError();
  }

  private handleTitleError(): void {
    this.formErrorPage
      .get('title')
      ?.statusChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value: FormControlStatus) => {
          if (value === 'INVALID') {
            this.errors['formErrorPage'] =
              'The title attribute is required';
          } else {
            this.errors['formErrorPage'] = '';
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
