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

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string = 'You MUST provide a value for the ID attribute 😡 !!!';
export const EMPTY_LABEL_ERROR: string = 'You MUST provide a value for the label attribute 😡 !!!';
export const EMPTY_PLACEHOLDER_ERROR: string = 'You MUST provide a value for the placeholder attribute 😡 !!!';

export type PasswordType = 'login' | 'signup';

export interface PasswordParams {
  minSize: number;
  minSpecialCharacters: number;
  minDigitalCharacters: number;
};

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
  @Input() placeholder: string = '';
  @Input() hasFailed: boolean = false;
  @Input() forgotPasswordLink: string = '';
  @Input() hasSucceeded: boolean = false;
  @Input() params: PasswordParams = {
    minSize: 8,
    minSpecialCharacters: 1,
    minDigitalCharacters: 1
  };

  inputType: string = 'password';
  mainLabelId: string = '';
  messagesId: string = '';
  ariaDescribedBy: string = '';
  showPasswordId: string = '';
  classeMessage: string = 'fr-message fr-message--';
  classDigitCharacters: string = 'fr-message fr-message--info';
  classSpecialCharacters: string = 'fr-message fr-message--info';
  classSizeCharacters: string = 'fr-message fr-message--info';
  autocomplete: string = '';
  inputGroupClasses: Record<string, boolean> = {};
  inputClasses: Record<string, boolean> = {};

  private _value!: string;

  onChange = (_: string) => { };
  onTouched = (_: string) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.writeValue(val);
  }

  ngOnInit(): void {

    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }

    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setComponentIds();
    this.setAutocompleteAttribute();
    this.setSuccessOrErrorClasses();

    if (this.hasFailed) {
      this.checkDigitCharacters();
      this.checkLengthCaracters();
      this.checkSpecialCharacters();
    }
  }

  private setSuccessOrErrorClasses() {
    this.inputGroupClasses = {
      'fr-input-group--error': this.hasFailed,
      'fr-input-group--valid': this.hasSucceeded
    };

    this.inputClasses = {
      'fr-input--error': this.hasFailed,
      'fr-input--valid': this.hasSucceeded
    };

  }

  setAutocompleteAttribute() {
    const isSignUp = this.type === 'signup';
    this.autocomplete = isSignUp ? 'new-password' : 'current-password';
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

  checkSpecialCharacters() {

    let resultClasse: string = 'info';
    let filteredSpecial: string[] = [];
    const regex = new RegExp(/[^A-Za-z0-9]/);

    if (this.value) {
      const arr = this.value.split('');
      filteredSpecial = arr.filter((character: string) => regex.test(character));
    }

    if (filteredSpecial.length >= this.params.minSpecialCharacters) {
      resultClasse = 'valid';
    }

    if (this.hasFailed && !filteredSpecial.length) {
      resultClasse = 'error';
    }

    this.classSpecialCharacters = `${this.classeMessage}${resultClasse}`;

  }

  checkDigitCharacters() {

    let resultClasse: string = 'info';
    let filteredDigit: string[] = [];
    const regex = new RegExp(/[0-9]/);

    if (this.value) {
      const arr = this.value.split('');
      filteredDigit = arr.filter((character: string) => regex.test(character));
    }

    if (filteredDigit.length >= this.params.minDigitalCharacters) {
      resultClasse = 'valid';
    }

    if (this.hasFailed && !filteredDigit.length) {
      resultClasse = 'error';
    }

    this.classDigitCharacters = `${this.classeMessage}${resultClasse}`;

  }

  checkLengthCaracters() {

    let resultClasse: string = 'info';

    if (this.value?.length >= this.params.minSize) {
      resultClasse = 'valid';
    }

    if (this.hasFailed && !this.value?.length) {
      resultClasse = 'error';
    }

    this.classSizeCharacters = `${this.classeMessage}${resultClasse}`;

  }

  handleChangePassword() {
    this.checkDigitCharacters();
    this.checkLengthCaracters();
    this.checkSpecialCharacters();
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
