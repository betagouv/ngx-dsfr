/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { TagType } from '@betagouv/ngx-dsfr/tag';
import { SelectOption } from '@betagouv/ngx-dsfr/select';

interface SettingsForm {
  label: FormControl<string>;
  description: FormControl<string>;
  hint: FormControl<string>;
  disabled: FormControl<boolean>;
  multiple: FormControl<boolean>;
  showSelectedOptions: FormControl<boolean>
  hasFailed: FormControl<boolean>;
  failureMessage: FormControl<string>;
  hasSucceeded: FormControl<boolean>;
  successMessage: FormControl<string>;
}

interface SimulationForm {
  select: FormControl<string[]>;
}

@Component({
  templateUrl: './select-module.component.html',
  styleUrls: ['./select-module.component.scss']
})
export class SelectModuleComponent implements OnInit {

  settingsForm: FormGroup<SettingsForm> | undefined;
  simulationForm: FormGroup<SimulationForm> | undefined;

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

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.settingsForm = this.formBuilder.group({
      label: ['This is a label', [Validators.required]],
      description: ['This is a description', [Validators.required]],
      hint: ['This is a hint', [Validators.required]],
      disabled: [false, [Validators.required]],
      multiple: [false, [Validators.required]],
      showSelectedOptions: [false, [Validators.required]],
      hasFailed: [false, [Validators.required]],
      failureMessage: ['This is a failure message', [Validators.required]],
      hasSucceeded: [false, [Validators.required]],
      successMessage: ['This is a success message', [Validators.required]]
    });
    this.simulationForm = this.formBuilder.group({select: [['Option 3']]});
  }

  onTagDelete(option: string) {
    const selected = this.simulationForm?.getRawValue().select || [];
    const index = selected.indexOf(option);
    selected.splice(index, 1);
    this.simulationForm?.setValue({select: selected});
  }
}
