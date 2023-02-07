/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss']
})
export class InputModuleComponent implements OnInit {

  inputForm: FormGroup | undefined;
  form: FormGroup | undefined;

  possibleInputTypes: Record<string, string> = {
    'text': 'text',
    'textarea': 'textarea',
    'date': 'date',
    'number': 'number'
  };

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.inputForm = this.formBuilder.group({
      label: ['This is a label', Validators.required],
      type: ['text', Validators.required],
      placeholder: ['This is a placeholder', Validators.required],
      hint: ['This is a description', Validators.required],
      icon: ['', Validators.required],
      disabled: [false, Validators.required],
      hasFailed: [false, Validators.required],
      hasSucceeded: [false, Validators.required],
      failureMessage: ['Error message', Validators.required],
      successMessage: ['Success message', Validators.required],
    });

    this.form = this.formBuilder.group({
      input: ''
    })
  }
}
