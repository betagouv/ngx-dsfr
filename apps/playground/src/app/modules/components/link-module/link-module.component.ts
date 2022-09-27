/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
type FormInlineTrue = {
  inline: FormControl<boolean>;
  label: FormControl<string>;
};

@Component({
  templateUrl: './link-module.component.html',
  styleUrls: ['./link-module.component.scss']
})
export class LinkModuleComponent implements OnInit {
  iconAlignment: typeof ElementAlignment = ElementAlignment;
  linkSize: typeof ElementSize = ElementSize;

  formInlineTrue: FormGroup<FormInlineTrue> | undefined;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formInlineTrue = this.formBuilder.group({
      inline: [{ value: true, disabled: true }],
      label: 'DSFR Link works 😁'
    });
  }
}
