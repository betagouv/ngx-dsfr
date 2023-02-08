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

@Component( {
  templateUrl: './alert-module.component.html',
  styleUrls: [ './alert-module.component.scss' ]
} )
export class AlertModuleComponent implements OnInit {

  alertForm: FormGroup | undefined;

  possibleTypes: Record<string, string> = {
    'info': 'info',
    'warning': 'warning',
    'success': 'success',
    'error': 'error'
  };

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
    this.alertForm = this.formBuilder.group( {
      type: new FormControl( AlertType.INFO, [ Validators.required ] ),
      title: new FormControl( 'This is a beautiful title', [ Validators.required ] ),
      description: new FormControl( 'This is a short description', [ Validators.required ] ),
      hasCloseButton: new FormControl( false, [ Validators.required ] ),
      hasRole: new FormControl( false, [ Validators.required ] ),
      size: new FormControl( ElementSize.MEDIUM, [ Validators.required ] )
    } );
  }
}
