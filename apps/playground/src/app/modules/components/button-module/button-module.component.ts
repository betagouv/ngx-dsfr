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

/**
 * TypeScript entities and constants
 */
interface ButtonForm {
  label: FormControl<string>;
  title: FormControl<string>;
  disabled: FormControl<boolean>;
  size: FormControl<ElementSize>;
  htmlType: FormControl<ButtonHtmlType>;
  type: FormControl<ButtonType>;
  icon: FormControl<string>;
  iconAlignment: FormControl<ElementAlignment>;
}

@Component({
  templateUrl: './button-module.component.html',
  styleUrls: ['./button-module.component.scss']
})
export class ButtonModuleComponent implements OnInit {

  buttonForm: FormGroup<ButtonForm> | undefined;
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

  possibleSizes: typeof ElementSize = ElementSize;

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.buttonForm = this.formBuilder.group({
      label: ['This is a beautiful button', [Validators.required]],
      title: ['This is a beautiful title', [Validators.required]],
      disabled: [false, [Validators.required]],
      size: [ElementSize.MEDIUM, [Validators.required]],
      htmlType: [ButtonHtmlType.BUTTON, [Validators.required]],
      type: [ButtonType.PRIMARY, [Validators.required]],
      icon: ['fr-icon-checkbox-circle-line', [Validators.required]],
      iconAlignment: [ElementAlignment.LEFT, [Validators.required]]
    });
  }

  handleClick() {
    this.nbButtonClicked++;
  }
}
