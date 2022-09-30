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
  'You MUST provide a legend for this radio buttons 😡 !!!';
export const EMPTY_NAME_ERROR: string =
  'You MUST provide a name for this radio buttons 😡 !!!';
export const EMPTY_ITEMS_ERROR: string =
  'You MUST provide a value for the items attribute 😡 !!!';

export interface IRadioItem {
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
  @Input() items: IRadioItem[] = [];
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
    this.ngControl.control?.valueChanges.subscribe(value => {
      if (this._value === value) return;
      this.writeValue(value);
    });
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

  valueChanged (event: string) {
    this.onChange(event);
  }
}
