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
interface FormHeaderWithAppName {
  institution: FormControl<string>;
  appName: FormControl<string>;
  appDescription: FormControl<string>;
}

interface FormHeaderWithLogo extends FormHeaderWithAppName {
  operatorLogoAlt: FormControl<string>;
}

@Component({
  templateUrl: './password-module.component.html',
  styleUrls: ['./password-module.component.scss']
})
export class PasswordModuleComponent implements OnInit, OnDestroy {
  formPassword: FormGroup<any> | undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formPassword = this.formBuilder.group({
      label: '',
      hint: ''
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
