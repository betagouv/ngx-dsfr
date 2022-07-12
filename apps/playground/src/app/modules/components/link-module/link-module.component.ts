/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { IconAlignment, LinkSize } from '@betagouv/ngx-dsfr/link';

@Component({
  templateUrl: './link-module.component.html',
  styleUrls: ['./link-module.component.scss']
})
export class LinkModuleComponent implements OnInit {
  iconAlignment: typeof IconAlignment = IconAlignment;
  linkSize: typeof LinkSize = LinkSize;

  formInlineTrue: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formInlineTrue = this.formBuilder.group({
      label: 'DSFR Link works 😁'
    });
  }
}
