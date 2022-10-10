/**
 * Angular imports
 */
import { Component, Input, OnInit, Self } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LEGEND_ERROR: string =
  'You MUST provide a legend for these radio buttons 😡 !!!';
export const EMPTY_NAME_ERROR: string =
  'You MUST provide a name for these radio buttons 😡 !!!';
export const EMPTY_ITEMS_ERROR: string =
  'You MUST provide a value for the items attribute 😡 !!!';

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

export class DsfrRadioComponent implements ControlValueAccessor, OnInit {
  @Input() legend = '';
  @Input() name = '';
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

  ngOnInit (): void {
    if (!this.legend) {
      throw EMPTY_LEGEND_ERROR;
    }
    if (!this.name) {
      throw EMPTY_NAME_ERROR;
    }
    if (this.items.length === 0) {
      throw EMPTY_ITEMS_ERROR;
    }
    this.setFieldSetClasses();
    this.setAriaLabelledBy();
  }

  setFieldSetClasses () {
    this.fieldSetClasses = {
      'fr-fieldset--inline': this.inline,
      'fr-fieldset--error': this.hasFailed,
      'fr-fieldset--valid': this.hasSucceeded
    };
  }

  setAriaLabelledBy () {
    if (this.hasFailed) {
      this.ariaLabelledBy = 'radio-error-legend radio-error-desc-error';
      return;
    }
    if (this.hasSucceeded) {
      this.ariaLabelledBy = 'radio-valid-legend radio-valid-desc-valid';
      return;
    }
    this.ariaLabelledBy = null;
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
