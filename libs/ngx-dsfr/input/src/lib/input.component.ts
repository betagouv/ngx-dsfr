/**
 * Angular imports
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DsfrFieldControlBaseComponent, NgChanges } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this input 😡 !!!';

export const EMPTY_NAME_ERROR: string =
  'You MUST provide a name for this input 😡 !!!';

/**
* TypeScript entities and constants
*/
type InputType = 'text' | 'number' | 'password';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dsfr-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class DsfrInputComponent extends DsfrFieldControlBaseComponent<string>  {

  @ViewChild('inputElement') public inputElement: ElementRef<HTMLInputElement> | undefined;

  @Input() label: string = '';
  @Input() name: string | undefined;
  @Input() placeholder: string = '';
  @Input() type?: InputType = 'text';
  @Input() description?: string | undefined;

  @Output() fieldKeyUp: EventEmitter<string> = new EventEmitter();

  focus(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  onInputBlur(event: FocusEvent): void {
    this.onTouched();
    this.fieldBlur.emit(event);
  }

  onInputFocus(event: FocusEvent): void {
    this.fieldFocus.emit(event);
  }

  onValueChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
  }

  onKeyUp(event: string): void {
    this.fieldKeyUp.emit(event);
  }
}
