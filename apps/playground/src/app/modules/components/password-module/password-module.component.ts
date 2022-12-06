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
import { PasswordParams } from 'libs/ngx-dsfr/password/src/lib/password.component';

/**
 * 3rd-party imports
 */
import { Subject } from 'rxjs';

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

    if (this.formSignUpPassword) {
      this.formSignUpPassword.valueChanges.subscribe(formData => {
        this.passwordSignUpParams.minSize = formData.minSize;
        this.passwordSignUpParams.minDigitalCharacters = formData.minDigit;
        this.passwordSignUpParams.minSpecialCharacters = formData.minSpecial;
      })
    }
  }

  private initForms(): void {

    this.formSignUpPassword = this.formBuilder.group({
      label: new FormControl('Enter your password', [Validators.required]),
      hint: new FormControl('This is a description'),
      minSize: new FormControl(this.passwordSignUpParams.minSize, [Validators.required, Validators.minLength(this.passwordSignUpParams.minSize)]),
      minDigit: new FormControl(this.passwordSignUpParams.minDigitalCharacters, [Validators.required]),
      minSpecial: new FormControl(this.passwordSignUpParams.minSpecialCharacters, [Validators.required]),
      isError: new FormControl(false)
    });

    this.formLoginPassword = this.formBuilder.group({
      label: new FormControl('Enter your password', [Validators.required]),
      hint: new FormControl('This is a description'),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
