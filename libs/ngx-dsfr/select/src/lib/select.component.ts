/**
 * Angular imports
 */
import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 3rd party imports
 */
import { TagType } from '@betagouv/ngx-dsfr/tag';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this select 😡 !!!';
export const EMPTY_ID_ERROR: string =
  'You MUST provide a value for the id attribute 😡 !!!';
export const EMPTY_OPTIONS_ERROR: string =
  'You MUST provide a value for the options attribute 😡 !!!';
export const MULTIPLE_SELECTED_ERROR: string =
  'You MUST select only one option if the multiple attribute is false 😡 !!!';
export const EMPTY_FAILURE_MESSAGE_ERROR: string =
  'You MUST provide a value for the failureMessage attribute when hasFailed is true 😡 !!!';
export const EMPTY_SUCCESS_MESSAGE_ERROR: string =
  'You MUST provide a value for the successMessage attribute when hasSucceeded is true 😡 !!!';

export const DEFAULT_PLACEHOLDER: string = 'Sélectionnez une option';

export interface SelectOption {
  id: string;
  label: string;
  value: string;
}

@Component({
  selector: 'dsfr-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrSelectComponent),
      multi: true
    }
  ]
})

export class DsfrSelectComponent implements ControlValueAccessor, OnChanges {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) options: SelectOption[] = [];
  @Input() defaultPlaceholder = DEFAULT_PLACEHOLDER;
  @Input() multiple = false;
  @Input() hint = '';
  @Input() disabled = false;
  @Input() hasFailed = false;
  @Input() failureMessage = '';
  @Input() hasSucceeded = false;
  @Input() successMessage = '';
  @Input() showSelectedValues: boolean = false;

  onChange = (_: string[]) => {};
  onTouched = () => {};

  placeholder!: string;
  divClasses: Record<string, boolean> = {};
  selectClasses: Record<string, boolean> = {};
  ariaDescribedBy: string | null = null;
  tagType = TagType.DELETABLE;
  isOptionsPanelOpened: boolean = false;

  @ViewChild('select', { static: true })
  select!: ElementRef;

  @ViewChild('optionsPanel')
  optionsPanel?: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  onClickOutsideOptionsPanel(event: MouseEvent): void {
    if (
      this.optionsPanel &&
      !this.optionsPanel.nativeElement.contains(event.target) &&
      !this.select.nativeElement.contains(event.target)
    ) {
      this.isOptionsPanelOpened = false;
    }
  }

  get values(): string[] {
    return this._values;
  }

  set values(val: string[]) {
    this.writeValue(val);
  }

  private _values!: string[];

  get selectedCount(): number {
    return this.values?.length || 0;
  }

  constructor(public elementRef: ElementRef) {}

  ngOnChanges(): void {
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }
    if (this.options.length === 0) {
      throw EMPTY_OPTIONS_ERROR;
    }
    if (!this.defaultPlaceholder) {
      this.defaultPlaceholder = DEFAULT_PLACEHOLDER;
    }
    if (this.hasFailed && !this.failureMessage) {
      throw EMPTY_FAILURE_MESSAGE_ERROR;
    }
    if (this.hasSucceeded && !this.successMessage) {
      throw EMPTY_SUCCESS_MESSAGE_ERROR;
    }
    if (!this.multiple && this.selectedCount > 1) {
      throw MULTIPLE_SELECTED_ERROR;
    }

    this.setClasses();
    this.setAriaDescribedBy();
    this.handlePlaceholder();
  }

  private setClasses() {
    this.divClasses = {
      'fr-select-group--disabled': this.disabled,
      'fr-select-group--error': this.hasFailed,
      'fr-select-group--valid': this.hasSucceeded
    };
    this.selectClasses = {
      'fr-select--disabled': this.disabled,
      'fr-select--error': this.hasFailed,
      'fr-select--valid': this.hasSucceeded
    };
  }

  private setAriaDescribedBy() {
    if (this.hasFailed) {
      this.ariaDescribedBy = `${this.id}-desc-error`;
      return;
    }
    if (this.hasSucceeded) {
      this.ariaDescribedBy = `${this.id}-desc-valid`;
    }
  }

  private handlePlaceholder() {
    const plural: string = this.selectedCount > 1 ? 's' : '';
    this.placeholder =
      this.selectedCount === 0
        ? this.defaultPlaceholder
        : `${this.selectedCount} option${plural} sélectionnée${plural}`;
  }

  registerOnChange(fn: (_: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(values: string[]): void {
    this._values = values;
    this.handlePlaceholder();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.setClasses();
  }

  selectOption(option: SelectOption) {
    if (this.multiple) {
      const alreadySelected = this.values.includes(option.label);
      this.values = alreadySelected
        ? [...this.values].filter((sel) => sel !== option.label)
        : [...this.values, option.label];
    } else {
      this.values = [option.label];
      this.isOptionsPanelOpened = false;
    }

    this.onChange(this.values);
  }

  toggleDropdown() {
    if (this.disabled) {
      return;
    }
    this.isOptionsPanelOpened = !this.isOptionsPanelOpened;
  }

  onValueDeleted(value: string) {
    const selectedValues = [...this.values];
    const index = selectedValues.indexOf(value);
    selectedValues.splice(index, 1);
    this.values = selectedValues;
    this.onChange(this.values);
  }
}
