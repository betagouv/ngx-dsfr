/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemResult } from '@betagouv/ngx-dsfr/search-bar';

/**
 * 3rd party imports
 */
import { TestSearchService } from './search-bar-module.service';

@Component({
  templateUrl: './search-bar-module.component.html',
  styleUrls: ['./search-bar-module.component.scss']
})
export class SearchBarModuleComponent implements OnInit {

  form: FormGroup | undefined;
  inputForm: FormGroup | undefined;
  inputSearchForm: FormGroup | undefined;
  selectedItem: ItemResult | undefined;
  submittedItem: string | undefined;
  possibleSizes: Record<string, string> = {
    'md': 'md',
    'lg': 'lg'
  };

  constructor(
    private formBuilder: FormBuilder,
    public testSearchService: TestSearchService
  ) { }

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
      size: ['lg', Validators.required],
      autocomplete: [true, Validators.required],
      displayNoResultMessage: [true, Validators.required],
      minCharacterForSearch: [3, Validators.required]
    });
  }

  onSelectItem(value: ItemResult): void {
    if (value.id) {
      this.selectedItem = value;
    }
  }

  onSubmitSearch(value: string): void {
    this.submittedItem = value;
  }

}
