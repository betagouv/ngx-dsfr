/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementAlignment } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './toggle-module.component.html',
  styleUrls: ['./toggle-module.component.scss']
})
export class ToggleModuleComponent {
  form = this.formBuilder.group({
    toggle: true
  });
  formToggle = this.formBuilder.group({
    toggleId: 'toggle-id',
    checkedLabel: 'Checked',
    unCheckedLabel: 'Unchecked',
    label: 'This is a label',
    hint: 'This is a hint',
    align: ElementAlignment.RIGHT,
    disabled: false,
    neutral: false,
    hideTexts: false
  });

  possibleAlignment: Record<string, string> = {
    'right': 'right',
    'left': 'left'
  };

  constructor(private formBuilder: NonNullableFormBuilder) {}
}
