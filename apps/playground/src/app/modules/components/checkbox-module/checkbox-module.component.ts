/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

@Component( {
  templateUrl: './checkbox-module.component.html',
  styleUrls: [ './checkbox-module.component.scss' ]
} )
export class CheckboxModuleComponent implements OnInit {

  checkboxForm: FormGroup | undefined;
  form: FormGroup | undefined;
  items = [
    {
      label: '1',
      id: 'inline_1',
      value: '1',
      name: '1',
      hint: 'Description 1'
    },
    {
      label: '2',
      id: 'inline_2',
      value: '2',
      name: '2',
      hint: 'Description 2'
    }
  ];

  possibleSizes: Record<string, string> = {
    'sm': 'sm',
    'md': 'md'
  };

  constructor( private formBuilder: NonNullableFormBuilder ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.checkboxForm = this.formBuilder.group( {
      legend: new FormControl( 'This is a legend', [ Validators.required ] ),
      hint: new FormControl( 'This is a hint', [ Validators.required ] ),
      inline: new FormControl( false, [ Validators.required ] ),
      disabled: new FormControl( false, [ Validators.required ] ),
      size: new FormControl( ElementSize.MEDIUM, [ Validators.required ] ),
      hasFailed: new FormControl( false, [ Validators.required ] ),
      failureMessage: new FormControl( 'This is a failure message', [ Validators.required ] ),
      hasSucceeded: new FormControl( false, [ Validators.required ] ),
      successMessage: new FormControl( 'This is a success message', [ Validators.required ] )
    } );
    this.form = this.formBuilder.group( {
      checkbox: new FormControl( [] )
    } );
  }
}
