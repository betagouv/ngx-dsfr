/**
 * Angular imports
 */
import { ChangeDetectorRef, Directive, EventEmitter, Host, Input, OnDestroy, OnInit, Optional, Output, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * Internal imports
 */
import { uniqueIdentifier } from '../helpers';

/**
 * 3rd party imports
 */
import { DsfrFormFieldComponent } from '@betagouv/ngx-dsfr/form-field';

/**
* TypeScript entities and constants
*/
type MarkFunctionProperties<Component> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
};
type ExcludeFunctionPropertyNames<T> = MarkFunctionProperties<T>[keyof T];
type ExcludeFunctions<T> = Pick<T, ExcludeFunctionPropertyNames<T>>;

export type NgChanges<Component, Props = ExcludeFunctions<Component>> = Partial<{
  [Key in keyof Props]: {
    previousValue: Props[Key];
    currentValue: Props[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  }
}>;

@Directive()
export class DsfrFieldControlBaseComponent<T> implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() public disabled: boolean | null | undefined = false;
  @Output() public fieldBlur = new EventEmitter<FocusEvent>();
  @Output() public fieldFocus = new EventEmitter<FocusEvent>();
  @Input() public identifier = uniqueIdentifier('field');

  isFocused = false;
  showError: boolean | null = false;
  showValid: boolean | null = false;
  value: T | undefined;

  protected subscriptions = new Subscription();

  constructor(
    protected readonly changeDetectorRef: ChangeDetectorRef,
    @Optional() @Host() public readonly formFieldComponent: DsfrFormFieldComponent,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    if (this.formFieldComponent) {
      this.identifier = this.formFieldComponent.identifier;
    }

    this.onFieldConstruct();

    this.subscriptions.add(this.fieldBlur.subscribe(() => this.isFocused = false));
    this.subscriptions.add(this.fieldFocus.subscribe(() => this.isFocused = true));
  }

  hasValidator(): boolean {
    return !!this.ngControl?.control?.errors || !!this.ngControl?.control?.validator || !!this.ngControl?.control?.asyncValidator;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.onFieldDestroy();
  }

  ngOnInit(): void {
    if (this.formFieldComponent) {
      this.formFieldComponent.setControl(this.ngControl);
    }

    if (this.ngControl) {
      const subscription = this.ngControl.statusChanges?.subscribe(() => {
        this.updateStatus();
      });
      this.subscriptions.add(subscription);
    }

    this.onFieldInit();
  }

  onChange(value: unknown): void {
    this.ngControlOnChange(value);
  }

  onFieldChanges(_changes: NgChanges<unknown>): void { }

  onFieldConstruct(): void { }

  onFieldDestroy(): void { }

  onFieldInit(): void { }

  onTouched(): void {
    this.ngControlOnTouched();
    this.updateStatus();
    if (this.formFieldComponent) {
      this.formFieldComponent.setTouched(true);
    }
  }

  registerOnChange(onChange: (_value: unknown) => void): void {
    this.ngControlOnChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.ngControlOnTouched = onTouched;
  }

  writeValue(value: T): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  protected updateStatus(): void {
    this.showError = this.ngControl?.touched && !this.ngControl.valid && !!this.ngControl.errors && this.hasValidator();
    this.showValid = this.ngControl?.touched && this.ngControl.valid && this.hasValidator();
    this.changeDetectorRef.markForCheck();
  }

  private ngControlOnChange = (_value: unknown) => { };
  private ngControlOnTouched = () => { };

}
