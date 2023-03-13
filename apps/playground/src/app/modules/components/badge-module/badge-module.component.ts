/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize, ThemeColor } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
interface BadgeForm {
  label: FormControl<string>;
  theme: FormControl<ThemeColor>;
  noIcon: FormControl<boolean>;
  size: FormControl<ElementSize>;
}

@Component( {
  templateUrl: './badge-module.component.html',
  styleUrls: [ './badge-module.component.scss' ]
} )
export class BadgeModuleComponent implements OnInit {

  badgeForm: FormGroup<BadgeForm> | undefined;
  theme: typeof ThemeColor = ThemeColor;

  possibleThemes: typeof ThemeColor = ThemeColor;

  possibleSizes: typeof ElementSize = ElementSize;

  constructor( private formBuilder: NonNullableFormBuilder ) {
  }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.badgeForm = this.formBuilder.group( {
      label: [ 'This is a label', [ Validators.required ] ],
      theme: [ ThemeColor.SUCCESS, [ Validators.required ] ],
      noIcon: [ false, [ Validators.required ] ],
      size: [ ElementSize.MEDIUM, [ Validators.required ] ]
    } );
  }
}
