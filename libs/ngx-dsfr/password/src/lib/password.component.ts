/**
 * Angular imports
 */
import {
  Component, EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string = 'You MUST provide a value for the ID attribute 😡 !!!';
export const EMPTY_LABEL_ERROR: string = 'You MUST provide a value for the label attribute 😡 !!!';

export type PasswordType = 'login' | 'signup';

export enum PasswordStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface PasswordParams {
  minSize: number;
  minSpecialCharacters: number;
  minDigitalCharacters: number;
}

@Component( {
  selector: 'dsfr-password',
  templateUrl: './password.component.html',
  styleUrls: [ './password.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => DsfrPasswordComponent ),
      multi: true
    }
  ]
} )
export class DsfrPasswordComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label: string = '';
  @Input() id: string | undefined;
  @Input() type: PasswordType = 'login';
  @Input() hint: string | undefined;
  @Input() placeholder: string = '';
  @Input() forgotPasswordLink: string = '';
  @Input() params: PasswordParams = {
    minSize: 8,
    minSpecialCharacters: 1,
    minDigitalCharacters: 1
  };

  @Output() passwordStatusUpdated = new EventEmitter<PasswordStatus>();

  @HostListener( 'window:mousedown', [ '$event' ] )
  onMouseDown( event: KeyboardEvent ): void {
    this.checkCapslockKey( event );
  }

  @HostListener( 'window:keydown', [ '$event' ] )
  onKeyDown( event: KeyboardEvent ): void {
    this.checkCapslockKey( event );
  }

  @HostListener( 'window:keyup', [ '$event' ] )
  onKeyUp( event: KeyboardEvent ): void {
    this.checkCapslockKey( event );
  }

  inputType: string = 'password';
  mainInputId: string = '';
  ariaDescribedBy: string = '';
  showPasswordId: string = '';
  classMessage: string = 'fr-message fr-message--';
  classDigitCharacters: string = 'fr-message fr-message--info';
  classSpecialCharacters: string = 'fr-message fr-message--info';
  classSizeCharacters: string = 'fr-message fr-message--info';
  autocomplete: string = '';
  inputGroupClasses: Record<string, boolean> = {};
  inputClasses: Record<string, boolean> = {};
  capslockKeyActive: boolean | null = null;
  hasFailed: boolean = false;
  hasSucceeded: boolean = false;
  isPasswordDisplayed: boolean = false;

  private _value!: string;

  onChange = ( _: string ) => {
  };
  onTouched = ( _: string ) => {
  };

  get value(): string {
    return this._value;
  }

  set value( val: string ) {
    this._value = val;
    this.onChange( val );
  }

  ngOnInit(): void {

    if ( !this.id ) {
      throw EMPTY_ID_ERROR;
    }

    if ( !this.label ) {
      throw EMPTY_LABEL_ERROR;
    }
  }

  ngOnChanges( changes: SimpleChanges ): void {
    this.setComponentIds();
    this.setAutocompleteAttribute();
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

  private checkCapslockKey( event: KeyboardEvent | MouseEvent ): void {
    if ( event.getModifierState ) {
      this.capslockKeyActive = event.getModifierState( 'CapsLock' ) ? true : null;
    }
  }

  private setComponentIds(): void {
    this.mainInputId = `${this.id}-input`;
    this.ariaDescribedBy = `${this.id}-input-messages`;
    this.showPasswordId = `${this.id}-show`;
  }

  displayPassword(): void {
    if ( this.inputType === 'password' ) {
      this.inputType = 'text';
      this.isPasswordDisplayed = true;
    } else {
      this.inputType = 'password';
      this.isPasswordDisplayed = false;
    }
  }

  private checkSpecialCharacters(): boolean {
    let resultClass: string;
    let isValid: boolean;
    let filteredSpecial: string[] = [];
    const regex = new RegExp( /[^A-Za-z0-9]/ );

    if ( this.value ) {
      const arr = this.value.split( '' );
      filteredSpecial = arr.filter( ( character: string ) =>
        regex.test( character )
      );
    }

    if ( filteredSpecial.length >= this.params.minSpecialCharacters ) {
      resultClass = 'valid';
      isValid = true;
    } else {
      resultClass = 'error';
      isValid = false;
    }

    this.classSpecialCharacters = `${this.classMessage}${resultClass}`;

    return isValid;
  }

  private checkDigitCharacters(): boolean {
    let resultClass: string;
    let isValid: boolean;
    let filteredDigit: string[] = [];
    const regex = new RegExp( /\d/ );

    if ( this.value ) {
      const arr = this.value.split( '' );
      filteredDigit = arr.filter( ( character: string ) => regex.test( character ) );
    }

    if ( filteredDigit.length >= this.params.minDigitalCharacters ) {
      resultClass = 'valid';
      isValid = true;
    } else {
      resultClass = 'error';
      isValid = false;
    }

    this.classDigitCharacters = `${this.classMessage}${resultClass}`;

    return isValid;
  }

  private checkLengthCharacters(): boolean {
    let resultClass: string;
    let isValid: boolean;

    if ( this.value?.length >= this.params.minSize ) {
      resultClass = 'valid';
      isValid = true;
    } else {
      resultClass = 'error';
      isValid = false;
    }

    this.classSizeCharacters = `${this.classMessage}${resultClass}`;

    return isValid;
  }

  handleChangePassword() {
    const isDigitConditionValid: boolean = this.checkDigitCharacters();
    const isSizeConditionValid: boolean = this.checkLengthCharacters();
    const isSpecialConditionValid: boolean = this.checkSpecialCharacters();

    this.passwordStatusUpdated.emit( isDigitConditionValid && isSizeConditionValid && isSpecialConditionValid ? PasswordStatus.VALID : PasswordStatus.INVALID );

    this.hasFailed =
      !isDigitConditionValid ||
      !isSizeConditionValid ||
      !isSpecialConditionValid;
    this.hasSucceeded =
      isDigitConditionValid && isSizeConditionValid && isSpecialConditionValid;

    this.setSuccessOrErrorClasses();
  }

  registerOnChange( fn: ( _: string ) => void ): void {
    this.onChange = fn;
  }

  registerOnTouched( fn: ( _: string ) => void ): void {
    this.onTouched = fn;
  }

  writeValue( value: string ): void {
    this._value = value;
  }
}
