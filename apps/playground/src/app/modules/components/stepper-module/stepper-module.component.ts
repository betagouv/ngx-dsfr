/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './stepper-module.component.html',
  styleUrls: ['./stepper-module.component.scss']
})
export class StepperModuleComponent implements OnInit {
  form: FormGroup | undefined;

  constructor (private formBuilder: FormBuilder) {
  }

  ngOnInit (): void {
    this.initForms();
  }

  private initForms (): void {
    this.form = this.formBuilder.group({
      label: 'DSFR Badge works 😁'
    });
  }
}
