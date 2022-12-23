/**
 * Angular imports
 */
import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

/**
 * TypeScript entities and constants
 */
type PropertyType = 'string' | 'boolean' | 'enum' | 'number';

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
  implements ControlValueAccessor, OnChanges {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: PropertyType = 'string';
  @Input() enum: Record<string, string> | {} = {};
  @Input() error: string | undefined = '';

  onControlValueChanges!: (_: any) => void;
  onControlTouched!: () => void;

  formControl: FormControl = new FormControl<any>(undefined);

  private unsubscribe$ = new Subject<void>();

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                   Lifecycle Hooks                                               *
   *                                                                                                                 *
   \******************************************************************************************************************/

  ngOnChanges(changes: SimpleChanges): void {
    const error: string = changes['error']?.currentValue;
    if (error) {
      this.formControl.setErrors({ error });
    }
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                ControlValueAccessor                                             *
   *                                                                                                                 *
   \******************************************************************************************************************/

  registerOnChange(fn: (_: any) => void): void {
    this.onControlValueChanges = fn;
    this.formControl.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (value: any) => {
        this.onControlValueChanges(value);
      }
    });
  }

  registerOnTouched(fn: () => void): void {
    this.onControlTouched = fn;
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  /*******************************************************************************************************************\
   *                                                                                                                 *
   *                                                Events Handlers                                                  *
   *                                                                                                                 *
   \******************************************************************************************************************/

  onBlur(): void {
    this.onControlTouched();
  }
}
