/**
 * Angular imports
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  implements ControlValueAccessor, AfterViewInit
{
  @Input() name: string = '';
  @Input() type: PropertyType = 'string';
  @Input() description: string = '';
  @Input() enum: Record<string, string> | {} = {};

  @ViewChild('input') inputElement: ElementRef<HTMLInputElement> | undefined;

  onControlValueChanges!: (_: any) => void;
  onControlValueTouched!: () => void;

  formControlValue: unknown;
  isDisabled: boolean = false;

  constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                   Lifecycle Hooks                                               *
   *                                                                                                                 *
   \******************************************************************************************************************/

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setValue();
      this.setDisabled();
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
    this.onControlValueTouched = fn;
  }

  writeValue(obj: any): void {
    this.formControlValue = obj;
    if (this.inputElement) {
      this.setValue();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.inputElement) {
      this.setDisabled();
    }
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                Events Handlers                                                  *
   *                                                                                                                 *
   \******************************************************************************************************************/

  onInput(event: Event): void {
    this.onControlValueChanges((event.target as HTMLInputElement).value);
  }

  onBlur(): void {
    this.onControlValueTouched();
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                   Helpers                                                       *
   *                                                                                                                 *
   \******************************************************************************************************************/

  private setValue(): void {
    this._renderer.setProperty(
      this.inputElement?.nativeElement,
      'value',
      this.formControlValue
    );
  }

  private setDisabled(): void {
    this._renderer.setProperty(
      this.inputElement?.nativeElement,
      'disabled',
      this.isDisabled
    );
  }
}
