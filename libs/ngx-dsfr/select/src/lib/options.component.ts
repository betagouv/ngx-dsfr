/**
 * Angular imports
 */
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

/**
 * 3rd-party imports
 */
import { COMPONENT_PORTAL_DATA, SelectOption } from '@betagouv/ngx-dsfr/select';

@Component({
  selector: 'dsfr-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class DsfrOptionsComponent implements OnInit {
  @Output() optionSelected = new EventEmitter<string[]>();

  options: SelectOption[] = [];
  selected: string[] = [];
  multiple = false;

  constructor(
    @Inject(COMPONENT_PORTAL_DATA) private data: {
      multiple: boolean,
      options: SelectOption[],
      selected: string[]
    }
  ) {}

  ngOnInit(): void {
    this.options = this.data.options;
    this.selected = this.data.selected;
    this.multiple = this.data.multiple;
  }

  selectOption(option: SelectOption) {
    if (this.multiple) {
      const alreadySelected = this.selected.includes(option.label);
      this.selected = alreadySelected ? [...this.selected].filter(sel => (sel !== option.label)) : [...this.selected, option.label];
    } else {
      this.selected = [option.label];
    }
    this.optionSelected.emit(this.selected);
  }
}
