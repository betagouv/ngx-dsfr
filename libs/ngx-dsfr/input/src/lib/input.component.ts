/**
 * Angular imports
 */
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide an id for this input 😡 !!!';
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this input 😡 !!!';
export const EMPTY_NAME_ERROR: string =
  'You MUST provide a name for this input 😡 !!!';
export const EMPTY_FAILURE_MESSAGE_ERROR: string =
  'You MUST provide a value for the failureMessage attribute when hasFailed is true 😡 !!!';


export type InputType = 'text' | 'textarea' | 'password' | 'number' | 'date';

@Component({
  selector: 'dsfr-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrInputComponent),
      multi: true
    }
  ]
})

export class DsfrInputComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label: string | undefined;
  @Input() name: string | undefined;
  @Input() id: string | undefined;
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';
  @Input() hasFailed = false;
  @Input() failureMessage: string | undefined;;
  @Input() hasSucceeded = false;
  @Input() successMessage: string | undefined;
  @Input() icon: string | undefined;
  @Input() hint: string | undefined;
  @Input() disabled: boolean = false;

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keyUp = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<FocusEvent>();

  onChange = (_: string) => { };
  onTouched = (_: string) => { };

  inputGroupClasses: Record<string, boolean> = {};
  inputClasses: Record<string, boolean> = {};
  ariaDescribedby: string | null = null;
  iconClass: string | null = '';

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.writeValue(val);
  }

  private _value!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasFailed && !this.failureMessage) {
      throw EMPTY_FAILURE_MESSAGE_ERROR;
    }
    this.setSuccessOrErrorClasses();
    this.setAriaDescribedBy();
  }

  ngOnInit(): void {
    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    if (!this.name) {
      throw EMPTY_NAME_ERROR;
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

    this.iconClass = this.icon ? 'fr-input-wrap ' + this.icon : '';
  }

  private setAriaDescribedBy() {
    if (this.id) {
      if (this.hasFailed) {
        this.ariaDescribedby = `${this.id} ${this.id}-error`;
        return;
      }
      if (this.hasSucceeded) {
        this.ariaDescribedby = `${this.id} ${this.id}-valid`;
        return;
      }
      this.ariaDescribedby = this.id;
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

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onBlur(event: FocusEvent) {
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  onKeyup(event: Event) {
    this.keyUp.emit(event);
  }

}
