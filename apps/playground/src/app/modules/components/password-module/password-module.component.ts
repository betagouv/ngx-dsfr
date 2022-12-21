/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';
import { PasswordParams } from '@betagouv/ngx-dsfr/password';

@Component({
  templateUrl: './password-module.component.html',
  styleUrls: ['./password-module.component.scss']
})
export class PasswordModuleComponent implements OnInit, OnDestroy {
  formLoginPassword: FormGroup<any> | undefined;
  formSignUpPassword: FormGroup<any> | undefined;
  defaultPasswordParams: string = "{ minSize: 8, minSpecialCharacters: 1, minDigitalCharacters: 1 }";
  passwordSignUpParams: PasswordParams = {
    minSize: 20,
    minDigitalCharacters: 3,
    minSpecialCharacters: 1
  };

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {

    this.formSignUpPassword = this.formBuilder.group({
      label: new FormControl('Enter your password', [Validators.required]),
      hint: new FormControl('This is a description'),
      placeholder: new FormControl('Enter your password...', [Validators.required]),
      minSize: new FormControl(this.passwordSignUpParams.minSize, [Validators.required]),
      minDigit: new FormControl(this.passwordSignUpParams.minDigitalCharacters, [Validators.required]),
      minSpecial: new FormControl(this.passwordSignUpParams.minSpecialCharacters, [Validators.required]),
    });

    this.formLoginPassword = this.formBuilder.group({
      label: new FormControl('Enter your password', [Validators.required]),
      placeholder: new FormControl('Enter your password...', [Validators.required]),
      forgotPasswordLink: new FormControl('/modules/password'),
      hint: new FormControl('This is a description'),
    });

    if (this.formSignUpPassword) {
      this.formSignUpPassword.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(formData => {
          this.passwordSignUpParams.minSize = formData.minSize;
          this.passwordSignUpParams.minDigitalCharacters = formData.minDigit;
          this.passwordSignUpParams.minSpecialCharacters = formData.minSpecial;
        }
        )
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
