/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * 3rd-party imports
 */

/**
 * TypeScript entities and constantss
 */


@Component({
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss']
})
export class InputModuleComponent implements OnInit {

  form: FormGroup | undefined;
  formInlineTrueErrors: Record<string, string> = {};

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
