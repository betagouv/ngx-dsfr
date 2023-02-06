/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';
import { ButtonHtmlType, ButtonType } from '@betagouv/ngx-dsfr/button';

@Component({
  templateUrl: './button-module.component.html',
  styleUrls: ['./button-module.component.scss']
})
export class ButtonModuleComponent implements OnInit {

  buttonForm: FormGroup | undefined;
  nbButtonClicked: number = 0;

  possibleTypes: Record<string, string> = {
    'primary': 'primary',
    'secondary': 'secondary',
    'tertiary': 'tertiary',
    'tertiary-no-outline': 'tertiary-no-outline',
    'close': 'close'
  };

  possibleIconAlignments: Record<string, string> = {
    'left': 'left',
    'right': 'right'
  };

  possibleHtmlTypes: Record<string, string> = {
    'button': 'button',
    'submit': 'submit',
    'reset': 'reset'
  };

  possibleSizes: Record<string, string> = {
    'sm': 'sm',
    'md': 'md',
    'lg': 'lg'
  };

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.buttonForm = this.formBuilder.group({
      label: new FormControl('This is a beautiful button', [Validators.required]),
      title: new FormControl('This is a beautiful title', [Validators.required]),
      disabled: new FormControl(false, [Validators.required]),
      size: new FormControl(ElementSize.MEDIUM, [Validators.required]),
      htmlType: new FormControl(ButtonHtmlType.BUTTON, [Validators.required]),
      type: new FormControl(ButtonType.PRIMARY, [Validators.required]),
      icon: new FormControl('fr-icon-checkbox-circle-line', [Validators.required]),
      iconAlignment: new FormControl(ElementAlignment.LEFT, [Validators.required]),
    });
  }

  handleClick() {
    this.nbButtonClicked++;
  }
}
