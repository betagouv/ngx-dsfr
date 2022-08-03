/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeColor } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './badge-module.component.html',
  styleUrls: ['./badge-module.component.scss']
})
export class BadgeModuleComponent implements OnInit {

  form: FormGroup | undefined;
  theme = ThemeColor;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      label: 'DSFR Badge works 😁'
    });
  }
}
