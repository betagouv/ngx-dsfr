/**
 * Angular imports
 */
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { ElementAlignment } from '@betagouv/ngx-dsfr';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide a value for the id attribute 😡 !!!';
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a value for the label attribute 😡 !!!';

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
export class DsfrToggleComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  @Input() toggleId!: string;
  @Input() checkedLabel: string = '';
  @Input() unCheckedLabel: string = '';
  @Input() label!: string;
  @Input() hint?: string;
  @Input() align: ElementAlignment = ElementAlignment.RIGHT;
  @Input() hideTexts = false;
  @Input() disabled? = false;
  @Input() neutral: boolean = false;

  @Output() toggled = new EventEmitter<boolean>();

  classes = '';
  ariaDescribedBy = '';

  onChange = (_: boolean) => {};
  onTouched = (_: boolean) => {};

  value: boolean | null = false;

  ngOnInit() {
    if (!this.toggleId) {
      throw EMPTY_ID_ERROR;
    }
  }

  ngOnChanges(): void {
    if (!this.toggleId) {
      throw EMPTY_ID_ERROR;
    }
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    this.initClasses();
    this.setAriaDescribedBy();
  }

  private initClasses(): void {
    this.classes = 'fr-toggle';
    if (this.align === ElementAlignment.LEFT) {
      this.classes += ` fr-toggle--label-${this.align}`;
    }
    if (this.neutral) {
      this.classes += ` neutral`;
    }
  }

  private setAriaDescribedBy() {
    this.ariaDescribedBy = this.toggleId + '-hint-text';
  }

  registerOnChange(fn: (_: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: boolean) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean | null): void {
    this.value = value;

    if (value !== null) {
      this.toggled.emit(value);
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onInputChange(event: any) {
    this.onChange(event.target.checked);
    this.toggled.emit(event.target.checked);
  }
}
