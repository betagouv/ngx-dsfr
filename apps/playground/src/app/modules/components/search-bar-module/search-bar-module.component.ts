/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';


/**
 * 3rd party imports
 */
import { ItemResult } from '@betagouv/ngx-dsfr/search-bar';
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
type FormAutocomplete = {
  autocomplete: FormControl<string>;
};

type FormInputSearch = {
  label: FormControl<string>,
  placeholder: FormControl<string>,
  size: FormControl<ElementSize>,
  autocomplete: FormControl<boolean>,
  displayNoResultMessage: FormControl<boolean>,
  minCharacterForSearch: FormControl<number>,
};

@Component({
  templateUrl: './search-bar-module.component.html',
  styleUrls: ['./search-bar-module.component.scss']
})
export class SearchBarModuleComponent implements OnInit {

  inputForm: FormGroup<FormAutocomplete> | undefined;
  inputSearchForm: FormGroup<FormInputSearch> | undefined;
  selectedItem: ItemResult | undefined;
  submittedQuery: string | undefined;
  possibleSizes: Record<string, string> = {
    'md': 'md',
    'lg': 'lg'
  };

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.inputForm = this.formBuilder.group({
      autocomplete: ['', Validators.required]
    });

    this.inputSearchForm = this.formBuilder.group({
      label: ['Rechercher', Validators.required],
      placeholder: ['Rechercher', Validators.required],
      size: [ElementSize.LARGE, Validators.required],
      autocomplete: [true, Validators.required],
      displayNoResultMessage: [true, Validators.required],
      minCharacterForSearch: [3, Validators.required]
    });
  }

  onItemSelected(value: ItemResult): void {
    if (value.id) {
      this.selectedItem = value;
    }
  }

  onSearchQuerySubmitted(value: string): void {
    this.submittedQuery = value;
  }

}
