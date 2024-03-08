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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide an id for this upload Component 😡 !!!';
export const EMPTY_HINT_ERROR: string =
  'You MUST provide a hint message for this upload Component 😡 !!!';
export const EMPTY_FAILURE_MESSAGE_ERROR: string =
  'You MUST provide a value for the failureMessage attribute when hasFailed is true 😡 !!!';
export const PREFILL_ERROR: string =
  'You CANNOT prefill this Component with a default value 😡 !!!';

@Component({
  selector: 'dsfr-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrUploadComponent),
      multi: true
    }
  ]
})
export class DsfrUploadComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() label?: string;
  @Input({ required: true }) id!: string;
  @Input({ required: true }) hint!: string;
  @Input() accept?: string;
  @Input() multiple: boolean = false;
  @Input() hasFailed = false;
  @Input() failureMessage?: string;

  @Output() filesSelected = new EventEmitter<FileList>();

  onChange = (_: FileList) => {};
  onTouched = () => {};

  inputGroupClasses: Record<string, boolean> = {};
  ariaDescribedby: string | null = null;

  disabled: boolean = false;
  files: FileList | undefined;

  ngOnInit(): void {
    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }
  }

  ngOnChanges(): void {
    if (!this.hint) {
      throw EMPTY_HINT_ERROR;
    }
    if (this.hasFailed && !this.failureMessage) {
      throw EMPTY_FAILURE_MESSAGE_ERROR;
    }

    this.setGroupClasses();
    this.setAriaDescribedBy();
    this.setDefaultLabel();
  }

  writeValue(val: any): void {
    if (val) {
      throw PREFILL_ERROR;
    }
  }

  registerOnChange(fn: (value: FileList) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private setGroupClasses() {
    this.inputGroupClasses = {
      'fr-input-group--error': this.hasFailed,
      'fr-input-group--disabled': this.disabled
    };
  }

  private setAriaDescribedBy() {
    if (this.hasFailed) {
      this.ariaDescribedby = `${this.id}-error`;
    }
  }

  private setDefaultLabel(): void {
    this.label = this.multiple ? 'Ajouter des fichiers' : 'Ajouter un fichier';
  }

  onControlTouched() {
    this.onTouched();
  }

  onFilesSelected(files: FileList) {
    this.onChange(files);
    this.filesSelected.emit(files);
  }

  private setErrorClasses() {
    this.inputGroupClasses = {
      'fr-input-group--error': this.hasFailed,
      'fr-input-group--disabled': this.disabled
    };
  }



}
