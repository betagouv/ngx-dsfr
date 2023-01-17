/**
 * Angular imports
 */
import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

/**
 * Internal imports
 */
import { DsfrSearchBarService } from './search-bar.service';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide an id for this component 😡 !!!';
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this component 😡 !!!';
export const EMPTY_SERVICE_ERROR: string =
  'You MUST provide a service for this component 😡 !!!';
export const MINIMUM_SEARCH_CHARACTER_ERROR: string =
  'You MUST provide a number greater than 0 for the  minCharacterForSearch\'s input 😡 !!!';

export interface ItemResult {
  label: string;
  id: string;
  originalObject?: any;
}

@Component({
  selector: 'dsfr-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DsfrSearchBarComponent),
      multi: true
    }
  ]
})
export class DsfrSearchBarComponent implements ControlValueAccessor, OnDestroy, OnChanges, AfterViewInit {

  @Input() id: string | undefined;
  @Input() label: string | undefined;
  @Input() placeholder: string = '';
  @Input() autocomplete: boolean = false;
  @Input() size: ElementSize = ElementSize.MEDIUM;
  @Input() minCharacterForSearch: number = 3;
  @Input() displayNoResultMessage: boolean = true;
  @Input() service: DsfrSearchBarService | undefined;

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keyUp = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() select = new EventEmitter<ItemResult>;
  @Output() submit = new EventEmitter<string>;

  onChange = (_: string) => { };
  onTouched = (_: string) => { };

  private unsubscribe$ = new Subject<void>();

  results: ItemResult[] = [];
  ariaDescribedby: string | null = null;
  displayResults: boolean = false;
  onSearch = new Subject<string>();
  noResult: boolean = false;
  loading: boolean = false;
  classes: string = '';

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this.writeValue(val);
  }

  private _value!: string;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }

    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }

    if (this.autocomplete && !this.service) {
      throw EMPTY_SERVICE_ERROR;
    }

    if (this.minCharacterForSearch < 1) {
      throw MINIMUM_SEARCH_CHARACTER_ERROR;
    }

    this.classes = `fr-search-bar fr-search-bar--${this.size}`;
  }

  ngAfterViewInit(): void {
    if (this.autocomplete) {
      this.initSearch();
    }
  }

  private initSearch(): void {
    this.onSearch.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe((value: string) => {
      this.results = [];
      this.noResult = false;
      if (this.value?.trim().length >= this.minCharacterForSearch) {
        this.loading = true;
        this.service?.search(value.trim()).subscribe(
          (data: ItemResult[]) => {
            this.loading = false;
            this.results = data;
            this.displayResults = true;
            this.noResult = this.results.length === 0;
          },
          (error) => {
            // if the API throw an error, it stops the loading message
            this.loading = false;
          }
        );
      }
    });
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: string) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this._value = value;
    this.onChange(value);
  }

  onBlur(event: FocusEvent) {
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  onKeyup(event: Event) {
    this.keyUp.emit(event);
  }

  onSelectOption(event: Event, itemResult: ItemResult) {
    /*
      According to the [href=#], it is for accessibility:
      each item will be accessible using tab keyboard
    */
    event.preventDefault();

    this.displayResults = false;
    this.writeValue(itemResult.label);
    this.select.emit(itemResult);
  }

  onSubmit() {
    this.displayResults = false;
    this.noResult = false;
    this.submit.emit(this.value);
  }

}
