/**
 * Angular imports
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatInput } from '@angular/material/input';

/**
 * TypeScript entities and constants
 */
type PropertyType = 'string' | 'boolean' | 'enum';

@Component({
  selector: 'play-input-property-control',
  templateUrl: './input-property-control.component.html',
  styleUrls: ['./input-property-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPropertyControlComponent),
      multi: true
    }
  ]
})
export class InputPropertyControlComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges
{
  @Input() name: string = '';
  @Input() type: PropertyType = 'string';
  @Input() description: string = '';
  @Input() enum: Record<string, string> | {} = {};
  @Input() error: string | undefined = '';

  @ViewChild('control') inputElement: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('control', { read: MatInput }) matInput: MatInput | undefined;

  onControlValueChanges!: (_: any) => void;
  onControlTouched!: () => void;

  formControlValue: any;
  isDisabled: boolean = false;

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                   Lifecycle Hooks                                               *
   *                                                                                                                 *
   \******************************************************************************************************************/

  ngOnChanges(changes: SimpleChanges): void {
    if (this.matInput) {
      this.matInput.errorState = !!changes['error']?.currentValue;
    }
  }

  ngAfterViewInit(): void {
    /*
     * We have to wait up until this lifecycle hook to have this.inputElement
     * not undefined. But setting these properties here trigger an
     * ExpressionChangedAfterItHasBeenCheckedError, so we're waiting
     * for a tick before actually setting them
     */
    setTimeout(() => {
      if (this.inputElement) {
        this.setValueOnHtmlElement(this.inputElement.nativeElement);
        this.setDisabledOnHtmlElement(this.inputElement.nativeElement);
      }
    }, 0);
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                ControlValueAccessor                                             *
   *                                                                                                                 *
   \******************************************************************************************************************/

  registerOnChange(fn: (_: any) => void): void {
    this.onControlValueChanges = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onControlTouched = fn;
  }

  writeValue(obj: any): void {
    this.formControlValue = obj;
    if (this.inputElement) {
      this.setValueOnHtmlElement(this.inputElement.nativeElement);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.inputElement) {
      this.setDisabledOnHtmlElement(this.inputElement.nativeElement);
    }
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                Events Handlers                                                  *
   *                                                                                                                 *
   \******************************************************************************************************************/

  onValueChanges(event: Event | MatSlideToggleChange): void {
    switch (this.type) {
      case 'string':
        const input: HTMLInputElement = (event as InputEvent)
          .target as HTMLInputElement;
        this.onControlValueChanges(input.value);
        break;
      case 'boolean':
        this.onControlValueChanges((event as MatSlideToggleChange).checked);
        break;
    }
  }

  onBlur(): void {
    this.onControlTouched();
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                   Helpers                                                       *
   *                                                                                                                 *
   \******************************************************************************************************************/

  private setValueOnHtmlElement(element: HTMLInputElement): void {
    this._renderer.setProperty(element, 'value', this.formControlValue);
  }

  private setDisabledOnHtmlElement(element: HTMLInputElement): void {
    this._renderer.setProperty(element, 'disabled', this.isDisabled);
  }
}
