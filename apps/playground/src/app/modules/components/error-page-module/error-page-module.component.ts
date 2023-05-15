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
import { ErrorStatus } from '@betagouv/ngx-dsfr/error-page';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

/**
 * TypeScript entities and constants
 */
interface FormErrorPage {
  appName: FormControl<string>;
  title: FormControl<string>
  status: FormControl<ErrorStatus>;
}

@Component({
  templateUrl: './error-page-module.component.html',
  styleUrls: ['./error-page-module.component.scss']
})
export class ErrorPageModuleComponent implements OnInit, OnDestroy {
  formErrorPage = this.formBuilder.group({
    appName: ['App Name', [Validators.required]],
    title: ['Page non trouvée', [Validators.required]],
    status: ['404' as ErrorStatus, [Validators.required]],
  });
  possibleStatusError: Record<string, string> = {
    '404': '404',
    '500': '500',
    '503': '503'
  };

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
