/**
 * Angular imports
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonType } from '@betagouv/ngx-dsfr/button';

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
export class DsfrPasswordComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit {

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

  @ViewChild('passwordInputField', { read: ElementRef }) passwordInputField: ElementRef | undefined;

  inputType: string = 'password';
  mainInputId: string = '';
  messagesId: string = '';
  ariaDescribedBy: string = '';
  showPasswordId: string = '';
  classMessage: string = 'fr-message fr-message--';
  classDigitCharacters: string = 'fr-message fr-message--info';
  classSpecialCharacters: string = 'fr-message fr-message--info';
  classSizeCharacters: string = 'fr-message fr-message--info';
  autocomplete: string = '';
  inputGroupClasses: Record<string, boolean> = {};
  inputClasses: Record<string, boolean> = {};
  buttonType: typeof ButtonType = ButtonType;
  buttonDisplayPasswordText: string = 'Afficher';
  capslockKeyActive: boolean | null = null;

  private _value!: string;

  onChange = (_: string) => { };
  onTouched = (_: string) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.writeValue(val);
  }

  constructor(private readonly cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }

    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }

    if (!this.placeholder) {
      throw EMPTY_PLACEHOLDER_ERROR;
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

  ngAfterViewInit(): void {
    this.handleCapslockEvent();
  }

  private handleCapslockEvent(): void {
    const eventHandler = (event: KeyboardEvent | MouseEvent) => {
      this.capslockKeyActive = event.getModifierState('CapsLock') ? true : null;
      this.cdRef.markForCheck();
    }
    this.passwordInputField?.nativeElement.addEventListener('keyup', eventHandler);
    this.passwordInputField?.nativeElement.addEventListener('mousedown', eventHandler);
  }

  private setSuccessOrErrorClasses(): void {
    this.inputGroupClasses = {
      'fr-input-group--error': this.hasFailed,
      'fr-input-group--valid': this.hasSucceeded
    };

    this.inputClasses = {
      'fr-input--error': this.hasFailed,
      'fr-input--valid': this.hasSucceeded
    };

  }

  private setAutocompleteAttribute(): void {
    this.autocomplete = this.type === 'signup' ? 'new-password' : 'current-password';
  }

  private setComponentIds(): void {
    this.mainInputId = `${this.id}-input`;
    this.ariaDescribedBy = `${this.id}-input-messages`;
    this.showPasswordId = `${this.id}-show`;
    this.messagesId = `${this.id}-input-messages`;
  }

  displayPassword(): void {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      this.buttonDisplayPasswordText = 'Masquer';
    } else {
      this.inputType = 'password';
      this.buttonDisplayPasswordText = 'Afficher';
    }
  }

  private checkSpecialCharacters(): void {

    let resultClass: string = 'info';
    let filteredSpecial: string[] = [];
    const regex = new RegExp(/[^A-Za-z0-9]/);

    if (this.value) {
      console.log(this.value);
      const arr = this.value.split('');
      filteredSpecial = arr.filter((character: string) => regex.test(character));
    }

    if (filteredSpecial.length >= this.params.minSpecialCharacters) {
      resultClass = 'valid';
    }

    if (this.hasFailed && (!filteredSpecial.length || filteredSpecial.length < this.params.minSpecialCharacters)) {
      resultClass = 'error';
    }

    this.classSpecialCharacters = `${this.classMessage}${resultClass}`;

  }

  private checkDigitCharacters(): void {

    let resultClass: string = 'info';
    let filteredDigit: string[] = [];
    const regex = new RegExp(/[0-9]/);

    if (this.value) {
      const arr = this.value.split('');
      filteredDigit = arr.filter((character: string) => regex.test(character));
    }

    if (filteredDigit.length >= this.params.minDigitalCharacters) {
      resultClass = 'valid';
    }

    if (this.hasFailed && (!filteredDigit.length || filteredDigit.length < this.params.minDigitalCharacters)) {
      resultClass = 'error';
    }

    this.classDigitCharacters = `${this.classMessage}${resultClass}`;

  }

  private checkLengthCaracters(): void {

    let resultClass: string = 'info';

    if (this.value?.length >= this.params.minSize) {
      resultClass = 'valid';
    }

    if (this.hasFailed && (!this.value?.length || this.value?.length < this.params.minSize)) {
      resultClass = 'error';
    }

    this.classSizeCharacters = `${this.classMessage}${resultClass}`;

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
  }

}
