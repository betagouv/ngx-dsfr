/**
 * Angular imports
 */
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { ElementAlignment } from '@betagouv/ngx-dsfr';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide a value for the id attribute 😡 !!!';

@Component({
  selector: 'dsfr-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrToggleComponent),
      multi: true
    }
  ]
})
export class DsfrToggleComponent implements ControlValueAccessor, OnChanges {
  @Input() id!: string;
  @Input() checkedLabel: string = '';
  @Input() unCheckedLabel: string = '';
  @Input() label: string = '';
  @Input() hint?: string;
  @Input() align: ElementAlignment = ElementAlignment.RIGHT;
  @Input() disabled? = false;

  @Output() onChanged = new EventEmitter<boolean>();

  classes = '';
  ariaDescribedBy = '';

  onChange = (_: boolean) => {
  };
  onTouched = (_: boolean) => {
  };

  private _value!: boolean;

  get value(): boolean {
    return this._value;
  }

  set value(val: boolean) {
    this.writeValue(val);
  }

  ngOnChanges(): void {
    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }
    this.initClasses();
    this.setAriaDescribedBy();
  }

  private initClasses(): void {
    this.classes = 'fr-toggle';
    if (this.align === ElementAlignment.LEFT) {
      this.classes += ` fr-toggle--label-${this.align}`;
    }
  }

  private setAriaDescribedBy() {
    this.ariaDescribedBy = this.id + '-hint-text';
  }

  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: boolean) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this._value = value;
    this.onChange(value);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onInputChange(event: any) {
    this.value = event.target.checked;
    this.onChanged.emit(event.target.checked);
  }
}
