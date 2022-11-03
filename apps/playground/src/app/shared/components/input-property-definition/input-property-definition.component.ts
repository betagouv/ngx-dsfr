/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_NAME_ERROR: string =
  'You MUST provide a value for the name attribute 😡 !!!';
export const EMPTY_TYPE_ERROR: string =
  'You MUST provide a value for the type attribute 😡 !!!';

@Component({
  selector: 'play-input-property-definition',
  templateUrl: './input-property-definition.component.html',
  styleUrls: ['./input-property-definition.component.scss']
})
export class InputPropertyDefinitionComponent implements OnInit {
  @Input() name!: string;
  @Input() required: boolean | string = false;
  @Input() type!: string;
  @Input() default: string = 'none';

  requiredBadgeValue: string = 'optional';

  ngOnInit(): void {
    if (!this.name) {
      throw EMPTY_NAME_ERROR;
    }

    if (!this.type) {
      throw EMPTY_TYPE_ERROR;
    }

    if (this.required === true) {
      this.requiredBadgeValue = 'required';
    } else if (typeof this.required === 'string') {
      this.requiredBadgeValue = this.required;
    }
  }
}
