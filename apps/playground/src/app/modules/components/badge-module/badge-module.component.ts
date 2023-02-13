/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';
import { ThemeColor } from '@betagouv/ngx-dsfr';

@Component( {
  templateUrl: './badge-module.component.html',
  styleUrls: [ './badge-module.component.scss' ]
} )
export class BadgeModuleComponent implements OnInit {

  badgeForm: FormGroup | undefined;
  theme: typeof ThemeColor = ThemeColor;

  possibleThemes: Record<string, string> = {
    'info': 'info',
    'new': 'new',
    'warning': 'warning',
    'success': 'success',
    'error': 'error',
    'blue-france': 'blue-france',
    'red-marianne': 'red-marianne',
    'grey': 'grey',
    'green-tilleul-verveine': 'green-tilleul-verveine',
    'green-bourgeon': 'green-bourgeon',
    'green-emeraude': 'green-emeraude',
    'green-menthe': 'green-menthe',
    'green-archipel': 'green-archipel',
    'blue-ecume': 'blue-ecume',
    'blue-cumulus': 'blue-cumulus',
    'purple-glycine': 'purple-glycine',
    'pink-macaron': 'pink-macaron',
    'pink-tuile': 'pink-tuile',
    'yellow-tournesol': 'yellow-tournesol',
    'yellow-moutarde': 'yellow-moutarde',
    'orange-terre-battue': 'orange-terre-battue',
    'brown-cafe-creme': 'brown-cafe-creme',
    'brown-caramel': 'brown-caramel',
    'brown-opera': 'brown-opera',
    'beige-gris-galet': 'beige-gris-galet'
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
    this.badgeForm = this.formBuilder.group( {
      label: new FormControl( 'This is a label', [ Validators.required ] ),
      theme: new FormControl( ThemeColor.SUCCESS, [ Validators.required ] ),
      noIcon: new FormControl( false, [ Validators.required ] ),
      size: new FormControl( ElementSize.MEDIUM, [ Validators.required ] )
    } );
  }
}
