/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ElementSize } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './checkbox-module.component.html',
  styleUrls: ['./checkbox-module.component.scss']
})
export class CheckboxModuleComponent implements OnInit {

  form: FormGroup | undefined;

  templateDrivenItems = [
    {
      label: '1',
      id: 'Test_1',
      value: '1'
    },
    {
      label: '2',
      id: 'Test_2',
      value: '2'
    }
  ];
  reactiveFormsItems = [
    {
      label: '1',
      id: 'Test-1',
      value: '1'
    },
    {
      label: '2',
      id: 'Test-2',
      value: '2'
    },
    {
      label: '3',
      id: 'Test-3',
      value: '3'
    }
  ];

  inlineItemsWithHint = [
    {
      label: '1',
      id: 'inline_1',
      value: '1',
      hint: 'Description 1'
    },
    {
      label: '2',
      id: 'inline_2',
      value: '2',
      hint: 'Description 2'
    }
  ];

  successItems = [
    {
      label: '1',
      id: 'success_1',
      value: '1'
    },
    {
      label: '2',
      id: 'success_2',
      value: '2'
    }
  ];

  errorItems = [
    {
      label: '1',
      id: 'error_1',
      value: '1'
    },
    {
      label: '2',
      id: 'error_2',
      value: '2'
    }
  ];

  disabledItems = [
    {
      label: '1',
      id: 'disabled_1',
      value: '1'
    },
    {
      label: '2',
      id: 'disabled_2',
      value: '2'
    }
  ];

  templateDrivenSelected = ['2'];
  reactiveFormsGroup: FormGroup | undefined;
  inlineModel = ['1'];
  successModel = ['1'];
  errorModel = ['1'];
  disabledModel = ['1'];
  smallSize = ElementSize.SMALL;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      label: 'DSFR checkbox works 😁'
    });

    this.reactiveFormsGroup = this.formBuilder.group({
      checkbox: [['1']]
    });
  }
}
