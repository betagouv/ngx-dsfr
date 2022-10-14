/**
 * Angular imports
 */
import { Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LEGEND_ERROR: string =
  'You MUST provide a legend for these radio buttons 😡 !!!';
export const EMPTY_NAME_ERROR: string =
  'You MUST provide a name for these radio buttons 😡 !!!';
export const EMPTY_FIELDSET_ID_ERROR: string =
  'You MUST provide a value for the fieldSetId attribute 😡 !!!';
export const EMPTY_ITEMS_ERROR: string =
  'You MUST provide a value for the items attribute 😡 !!!';
export const EMPTY_FAILURE_MESSAGE_ERROR: string =
  'You MUST provide a value for the failureMessage attribute when hasFailed is true 😡 !!!';
export const EMPTY_SUCCESS_MESSAGE_ERROR: string =
  'You MUST provide a value for the successMessage attribute when hasSucceeded is true 😡 !!!';

export interface RadioItem {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

@Component({
  selector: 'dsfr-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})

export class DsfrRadioComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() legend = '';
  @Input() name = '';
  @Input() fieldSetId = '';
  @Input() hint = '';
  @Input() items: RadioItem[] = [];
  @Input() inline = false;
  @Input() disabled = false;
  @Input() size = ElementSize.MEDIUM;
  @Input() hasFailed = false;
  @Input() failureMessage = '';
  @Input() hasSucceeded = false;
  @Input() successMessage = '';
  onChange = (_: string) => {
  };
  onTouched = (_: string) => {
  };
  fieldSetClasses: Record<string, boolean> = {};
  ariaLabelledBy: string | null = null;

  get value (): string {
    return this._value;
  }

  set value (val: string) {
    this.writeValue(val);
  }

  private _value!: string;

  constructor (@Self() private ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnChanges (changes: SimpleChanges): void {
    if (this.hasFailed && !this.failureMessage) {
      throw EMPTY_FAILURE_MESSAGE_ERROR;
    }
    if (this.hasSucceeded && !this.successMessage) {
      throw EMPTY_SUCCESS_MESSAGE_ERROR;
    }
    this.setFieldSetClasses();
    this.setAriaLabelledBy();
  }

  ngOnInit (): void {
    if (!this.legend) {
      throw EMPTY_LEGEND_ERROR;
    }
    if (!this.name) {
      throw EMPTY_NAME_ERROR;
    }
    if (!this.fieldSetId) {
      throw EMPTY_FIELDSET_ID_ERROR;
    }
    if (this.items.length === 0) {
      throw EMPTY_ITEMS_ERROR;
    }
  }

  private setFieldSetClasses () {
    this.fieldSetClasses = {
      'fr-fieldset--inline': this.inline,
      'fr-fieldset--error': this.hasFailed,
      'fr-fieldset--valid': this.hasSucceeded
    };
  }

  private setAriaLabelledBy () {
    if (this.hasFailed) {
      this.ariaLabelledBy = `${this.fieldSetId} ${this.fieldSetId}-error`;
      return;
    }
    if (this.hasSucceeded) {
      this.ariaLabelledBy = `${this.fieldSetId} ${this.fieldSetId}-valid`;
      return;
    }
    this.ariaLabelledBy = this.fieldSetId;
  }

  registerOnChange (fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched (fn: (_: string) => void): void {
    this.onTouched = fn;
  }

  writeValue (value: string): void {
    this._value = value;
    this.onChange(value);
  }

  setDisabledState (isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
