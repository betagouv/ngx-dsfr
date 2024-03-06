/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { TagType } from '@betagouv/ngx-dsfr/tag';
import { SelectOption } from '@betagouv/ngx-dsfr/select';

@Component({
  templateUrl: './select-module.component.html',
  styleUrls: ['./select-module.component.scss']
})
export class SelectModuleComponent {
  settingsForm = this.formBuilder.group({
    label: ['This is a label', [Validators.required]],
    defaultPlaceholder: ['This is a placeholder', [Validators.required]],
    hint: ['This is a hint', [Validators.required]],
    disabled: [false, [Validators.required]],
    multiple: [false, [Validators.required]],
    showSelectedValues: [false, [Validators.required]],
    hasFailed: [false, [Validators.required]],
    failureMessage: ['This is a failure message', [Validators.required]],
    hasSucceeded: [false, [Validators.required]],
    successMessage: ['This is a success message', [Validators.required]]
  });
  simulationForm = this.formBuilder.group({select: [['Option 3']]});

  options: SelectOption[] = [
    {
      label: 'Option 1',
      id: 'option_1',
      value: 'option 1'
    },
    {
      label: 'Option 2',
      id: 'option_2',
      value: 'option 2'
    },
    {
      label: 'Option 3',
      id: 'option_3',
      value: 'option 3'
    },
    {
      label: 'Option 4',
      id: 'option_4',
      value: 'option 4'
    },
    {
      label: 'Option 5',
      id: 'option_5',
      value: 'option 5'
    },
    {
      label: 'Option 6',
      id: 'option_6',
      value: 'option 6'
    }
  ];
  tagType = TagType.DELETABLE;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  onValueDelete(value: string) {
    const selected = this.simulationForm?.getRawValue().select || [];
    const index = selected.indexOf(value);
    selected.splice(index, 1);
    this.simulationForm?.setValue({select: selected});
  }
}
