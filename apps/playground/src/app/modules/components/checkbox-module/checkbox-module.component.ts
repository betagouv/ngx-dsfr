/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

interface SettingsForm {
  legend: FormControl<string>;
  hint: FormControl<string>;
  inline: FormControl<boolean>;
  disabled: FormControl<boolean>;
  size: FormControl<ElementSize>;
  hasFailed: FormControl<boolean>;
  failureMessage: FormControl<string>;
  hasSucceeded: FormControl<boolean>;
  successMessage: FormControl<string>;
}

interface SimulationForm {
  checkbox: FormControl<string[]>;
}

@Component( {
  templateUrl: './checkbox-module.component.html',
  styleUrls: [ './checkbox-module.component.scss' ]
} )
export class CheckboxModuleComponent implements OnInit {

  settingsForm: FormGroup<SettingsForm> | undefined;
  simulationForm: FormGroup<SimulationForm> | undefined;
  items = [
    {
      label: '1',
      id: 'inline_1',
      value: '1',
      hint: 'Description 1',
      disabled: false
    },
    {
      label: '2',
      id: 'inline_2',
      value: '2',
      hint: 'Description 2',
      disabled: true
    }
  ];

  possibleSizes: typeof ElementSize = ElementSize;

  constructor( private formBuilder: NonNullableFormBuilder ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.settingsForm = this.formBuilder.group( {
      legend: [ 'This is a legend', [ Validators.required ] ],
      hint: [ 'This is a hint', [ Validators.required ] ],
      inline: [ false, [ Validators.required ] ],
      disabled: [ false, [ Validators.required ] ],
      size: [ ElementSize.MEDIUM, [ Validators.required ] ],
      hasFailed: [ false, [ Validators.required ] ],
      failureMessage: [ 'This is a failure message', [ Validators.required ] ],
      hasSucceeded: [ false, [ Validators.required ] ],
      successMessage: [ 'This is a success message', [ Validators.required ] ]
    } );
    this.simulationForm = this.formBuilder.group( { checkbox: [ [ '' ] ] } );
  }
}
