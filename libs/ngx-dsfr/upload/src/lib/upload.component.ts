/**
 * Angular imports
 */
import {
  Component, EventEmitter, forwardRef,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide an id for this input 😡 !!!';
export const EMPTY_NAME_ERROR: string =
  'You MUST provide a name for this input 😡 !!!';
export const EMPTY_FAILURE_MESSAGE_ERROR: string =
  'You MUST provide a value for the failureMessage attribute when hasFailed is true 😡 !!!';

@Component({
  selector: 'dsfr-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrUploadComponent),
      multi: true
    }
  ]
})
export class DsfrUploadComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label: string = this.setDefaultLabel();
  @Input() name: string | undefined;
  @Input() id: string | undefined;
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hint: string | undefined;
  @Input() hasFailed = false;
  @Input() failureMessage: string | undefined;

  @Output() onFileSelected = new EventEmitter<void>();

  onChange = (_: string) => { };
  onTouched = (_: string) => { };

  inputGroupClasses: Record<string, boolean> = {};
  ariaDescribedby: string | null = null;

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
    if (!this.name) {
      throw EMPTY_NAME_ERROR;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasFailed && !this.failureMessage) {
      throw EMPTY_FAILURE_MESSAGE_ERROR;
    }
    this.setErrorClasses();
    this.setAriaDescribedBy();
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

  private setDefaultLabel() {
    return (this.multiple ? 'Ajouter des fichiers' : 'Ajouter un fichier');
  }

  private setAriaDescribedBy() {
    if (this.id) {
      if (this.hasFailed) {
        this.ariaDescribedby = `${this.id} ${this.id}-error`;
        return;
      }
      this.ariaDescribedby = this.id;
    }
  }

  private setErrorClasses() {
    this.inputGroupClasses = {
      'fr-input-group--error': this.hasFailed,
      'fr-input-group--disabled': this.disabled
    };
  }



}
