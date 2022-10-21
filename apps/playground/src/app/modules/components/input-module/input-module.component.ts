/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss']
})
export class InputModuleComponent implements OnInit {

  form: FormGroup | undefined;
  inputForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      label: 'DSFR Input works 😁'
    });
    this.inputForm = this.formBuilder.group({
      trytest: ['', Validators.required]
    });
  }
}
