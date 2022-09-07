/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './navigation-module.component.html',
  styleUrls: ['./navigation-module.component.scss']
})
export class NavigationModuleComponent implements OnInit {

  iconAlignment: typeof ElementAlignment = ElementAlignment;
  linkSize: typeof ElementSize = ElementSize;
  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      label: 'DSFR NAvigation works 😁'
    });
  }
}
