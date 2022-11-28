/**
 * Angular imports
 */
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PositiveNumber } from '@betagouv/ngx-dsfr';

/**
 * 3rd-party imports
 */


/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string = 'You MUST provide a value for the ID attribute 😡 !!!';
export const EMPTY_LABEL_ERROR: string = 'You MUST provide a value for the label attribute 😡 !!!';

export type PasswordType = 'login' | 'signup';

export interface PasswordParams {
  size: number; // PositiveNumber<1, 1000>;
  nbMinSpecialCharacters: number; // PositiveNumber<1, 100>;
  nbMinDigitalCharacters: number; // PositiveNumber<1, 100>;
};

interface passwordConditions {
  digit: passwordConditionKey;
  special: passwordConditionKey;
  length: passwordConditionKey;
  [key: string]: passwordConditionKey;
}

interface passwordConditionKey {
  active: boolean;
  regex?: RegExp;
  test?: Function;
}

@Component({
  selector: 'dsfr-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrPasswordComponent),
      multi: true
    }
  ]
})
export class DsfrPasswordComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label: string = '';
  @Input() id: string | undefined;
  @Input() type: PasswordType = 'login';
  @Input() hint: string | undefined;
  @Input() params: PasswordParams = {
    size: 8,
    nbMinSpecialCharacters: 1,
    nbMinDigitalCharacters: 1
  };

  inputType: string = 'password';
  mainLabelId: string = '';
  messagesId: string = '';
  ariaDescribedBy: string = '';
  showPasswordId: string = '';

  passwordConditions: passwordConditions | undefined;
  classDigitCharacters: string = 'info';
  classSpecialCharacters: string = 'info';
  classSizeCharacters: string = 'info';

  onChange = (_: string) => { };
  onTouched = (_: string) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.writeValue(val);
  }

  private _value!: string;

  ngOnInit(): void {

    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }

    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.passwordConditions);
    this.setPasswordConditions();
  }

  setComponentIds(): void {
    this.mainLabelId = `${this.id}-input`;
    this.ariaDescribedBy = `${this.id}-input-messages`;
    this.showPasswordId = `${this.id}-show`;
  }

  displayPassword(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  setPasswordConditions(): void {
    this.passwordConditions = {
      digit: { regex: /[0-9]/, active: false },
      special: { regex: /[^A-Za-z0-9]/, active: false },
      length: { test: (e: any) => (e.length >= this.params.size), active: false },
    };

    console.log(this.passwordConditions);

    const classeMessage = 'fr-message fr-message--';

  }

  handleChangePassword() {
    if (this.passwordConditions) {

      Object.keys(this.passwordConditions).forEach((key) => {
        // console.log(this.passwordConditions);
      })

      for (const key in this.passwordConditions) {

        if (this.passwordConditions[key])

          console.log(this.passwordConditions[key]);

        if (this.passwordConditions[key]?.regex) {
          // const regex = new RegExp(this.passwordConditions[key]?.regex);
          // this.passwordConditions[key].active = regex.test(this.value);
        }

        if ((key === 'length') && this.passwordConditions[key]) {

          // this.passwordConditions[key].active = this.passwordConditions[key].test(this.value);
        }
      }
    }
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: string) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this._value = value;
    this.onChange(value);
  }

}
