/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';
import { AlertType } from '@betagouv/ngx-dsfr/alert';

/**
 * TypeScript entities and constants
 */
interface AlertForm {
  type: FormControl<AlertType>;
  title: FormControl<string>;
  description: FormControl<string>;
  hasCloseButton: FormControl<boolean>;
  hasRole: FormControl<boolean>;
  size: FormControl<ElementSize>;
}

@Component( {
  templateUrl: './alert-module.component.html',
  styleUrls: [ './alert-module.component.scss' ]
} )
export class AlertModuleComponent implements OnInit {

  alertForm: FormGroup<AlertForm> | undefined;

  possibleTypes: typeof AlertType = AlertType;

  possibleSizes: typeof ElementSize = ElementSize;

  constructor( private formBuilder: NonNullableFormBuilder ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.alertForm = this.formBuilder.group( {
      type: [ AlertType.INFO, [ Validators.required ] ],
      title: [ 'This is a beautiful title', [ Validators.required ] ],
      description: [ 'This is a short description', [ Validators.required ] ],
      hasCloseButton: [ false, [ Validators.required ] ],
      hasRole: [ false, [ Validators.required ] ],
      size: [ ElementSize.MEDIUM, [ Validators.required ] ]
    } );
  }
}
