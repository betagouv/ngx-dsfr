/**
 * Angular imports
 */
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subject, takeUntil } from 'rxjs';

/**
 * Internal imports
 */
import { DsfrSearchBarService, DSFR_SEARCH_BAR_SERVICE_TOKEN } from './search-bar.service';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ID_ERROR: string =
  'You MUST provide an id for this component 😡 !!!';
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this component 😡 !!!';
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

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>

  @Input() id: string | undefined;
  @Input() label: string | undefined;
  @Input() placeholder: string = '';
  @Input() autocomplete: boolean = false;
  @Input() size: ElementSize = ElementSize.MEDIUM;
  @Input() minCharacterForSearch: number = 3;
  @Input() displayNoResultMessage: boolean = true;

  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() keyup = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() searchResultSelected = new EventEmitter<ItemResult>();
  @Output() searchQuerySubmitted = new EventEmitter<string>();

  onChange = (_: ItemResult | string) => { };
  onTouched = (_: ItemResult | string) => { };

  private unsubscribe$ = new Subject<void>();

  results: ItemResult[] = [];
  displayResults: boolean = false;
  noResult: boolean = false;
  loading: boolean = false;
  classes: string = '';

  get value(): string | ItemResult {
    return this._value;
  }

  set value(val: ItemResult | string) {
    this._value = val;
    this.onChange(val);
  }

  private _value!: string | ItemResult;

  constructor(
    @Inject(DSFR_SEARCH_BAR_SERVICE_TOKEN)
    @Optional()
    private searchService: DsfrSearchBarService
  ) { }

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
    fromEvent(this.searchInput.nativeElement, 'input').pipe(
      map(() => this.searchInput.nativeElement.value),
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(
      (value: string) => {
        this.results = [];
        this.noResult = false;
        if (value.trim().length >= this.minCharacterForSearch) {
          this.loading = true;
          this.searchService.search(value.trim()).subscribe({
            next: (data: ItemResult[]) => {
              this.loading = false;
              this.results = data;
              this.displayResults = true;
              this.noResult = this.results.length === 0;
            },
            error: () => {
              // If the API throws an error, we stop the loading message
              this.loading = false;
            }
          });
        }
      }
    );
  }

  registerOnChange(fn: (_: ItemResult | string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: ItemResult | string) => void): void {
    this.onTouched = fn;
  }

  writeValue(value: ItemResult | string): void {
    this._value = value;
    if (value) {
      this.searchInput.nativeElement.value =
        typeof this.value === 'string' ? this.value : this.value.label;
    }
  }

  onBlur(event: FocusEvent) {
    this.blur.emit(event);
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  onKeyup(event: Event) {
    this.keyup.emit(event);
  }

  onSearchResultSelected(event: Event, itemResult: ItemResult) {
    /*
      * Since we've wrapped search results into <a> tags,
      * for accessibility ( each item will then be accessible
      * using tab keyboard ), we have to prevent the natural
      * behavior of the browser, which would refresh the page
      */
    event.preventDefault();

    this.displayResults = false;
    this.value = itemResult;
    this.searchInput.nativeElement.value = this.value.label;
    this.searchResultSelected.emit(this.value);
  }

  onSubmit(value: string) {
    this.displayResults = false;
    if (this.autocomplete) {
      this.value = value;
      this.searchQuerySubmitted.emit(value);
    }
  }

}
