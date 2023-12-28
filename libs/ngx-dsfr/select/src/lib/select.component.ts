/**
 * Angular imports
 */
import {
  Component, ElementRef,
  forwardRef, Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

/**
 * 3rd party imports
 */
import { TagType } from '@betagouv/ngx-dsfr/tag';

/**
 * Internal imports
 */
import { DsfrOptionsComponent } from './options.component';
import { COMPONENT_PORTAL_DATA } from '../index';

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
  'You MUST select only one option 😡 !!!';
export const EMPTY_FAILURE_MESSAGE_ERROR: string =
  'You MUST provide a value for the failureMessage attribute when hasFailed is true 😡 !!!';
export const EMPTY_SUCCESS_MESSAGE_ERROR: string =
  'You MUST provide a value for the successMessage attribute when hasSucceeded is true 😡 !!!';

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

export class DsfrSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input({required: true}) label!: string;
  @Input({required: true}) id!: string;
  @Input({required: true}) options: SelectOption[] = [];
  @Input() description = 'Selectionnez une option';
  @Input() multiple = false;
  @Input() hint = '';
  @Input() disabled = false;
  @Input() hasFailed = false;
  @Input() failureMessage = '';
  @Input() hasSucceeded = false;
  @Input() successMessage = '';
  @Input() showSelectedOptions: boolean = false;
  onChange = (_: string[]) => {
  };
  onTouched = (_: string[]) => {
  };
  selectedCount = 0;
  placeholder!: string;
  divClasses: Record<string, boolean> = {};
  selectClasses: Record<string, boolean> = {};
  ariaLabelledBy: string | null = null;
  tagType = TagType.DELETABLE;

  private selectOverlay: OverlayRef = this.overlayService.create({
    hasBackdrop: true,
    backdropClass: ''
  });

  @ViewChild('selectOverlayOrigin', {static: true})
  private selectOverlayTrigger!: ElementRef;

  private takeUntilDestroyed = takeUntilDestroyed();

  constructor(
    private readonly overlayService: Overlay,
    private elementRef: ElementRef
  ) {}

  get values(): string[] {
    return this._values;
  }

  set values(val: string[]) {
    this.writeValue(val);
  }

  private _values!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.description) {
      this.description = 'Selectionnez une option';
    }
    if (this.hasFailed && !this.failureMessage) {
      throw EMPTY_FAILURE_MESSAGE_ERROR;
    }
    if (this.hasSucceeded && !this.successMessage) {
      throw EMPTY_SUCCESS_MESSAGE_ERROR;
    }
    this.setClasses();
    this.setAriaLabelledBy();
    this.handlePlaceholder();
  }

  ngOnInit(): void {
    this.selectOverlay.updateSize({width: this.elementRef.nativeElement.clientWidth});
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    if (!this.multiple && this.selectedCount > 1) {
      throw MULTIPLE_SELECTED_ERROR;
    }
    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }
    if (this.options.length === 0) {
      throw EMPTY_OPTIONS_ERROR;
    }

    this.createSelectOverlay(
      this.selectOverlay,
      this.selectOverlayTrigger
    );
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

  private setAriaLabelledBy() {
    if (this.hasFailed) {
      this.ariaLabelledBy = `${this.id}-desc-error`;
      return;
    }
    if (this.hasSucceeded) {
      this.ariaLabelledBy = `${this.id}-desc-valid`;
    }
  }

  private handlePlaceholder() {
    this.selectedCount = this.values?.length || 0;
    this.placeholder = this.selectedCount === 0 ? this.description : `${this.selectedCount} options selectionées`;
  }

  registerOnChange(fn: (_: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: string[]) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string[]): void {
    this._values = value;
    this.handlePlaceholder();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private createSelectOverlay(
    overlayRef: OverlayRef,
    overlayTrigger: ElementRef
  ): void {
    overlayRef.updatePositionStrategy(
      this.overlayService
        .position()
        .flexibleConnectedTo(overlayTrigger)
        .withPositions([
          {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'}
        ])
    );

    overlayRef
      .outsidePointerEvents()
      .pipe(this.takeUntilDestroyed)
      .subscribe({
        next: (event: any) => {
          // If we're clicking outside and NOT on the trigger, close the overlay
          if (!overlayTrigger.nativeElement.contains(event.target)) {
            overlayRef.detach();
          }
        }
      });
  }

  toggleDropdown() {
    if (this.disabled) {
      return;
    }
    if (this.selectOverlay.hasAttached()) {
      this.selectOverlay.detach();
    } else {
      const portalInjector = Injector.create({
        providers: [
          {
            provide: COMPONENT_PORTAL_DATA,
            useValue: {
              options: this.options,
              selected: this.values,
              multiple: this.multiple
            }
          }
        ]
      });
      const componentRef = this.selectOverlay.attach(
        new ComponentPortal(DsfrOptionsComponent, null, portalInjector)
      );
      componentRef.instance.optionSelected.subscribe((selected) => {
        if (!this.multiple) {
          this.selectOverlay.detach();
        }
        this.values = selected;
        this.onChange(this.values);
      });
    }
  }

  onOptionDeleted(selected: string) {
    const selectedOptions = [...this.values];
    const index = selectedOptions.indexOf(selected);
    selectedOptions.splice(index, 1);
    this.values = selectedOptions;
    this.onChange(this.values);
  }
}
