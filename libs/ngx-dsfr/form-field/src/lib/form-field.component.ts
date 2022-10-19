/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

/**
 * 3rd party imports
 */
import { uniqueIdentifier } from '@betagouv/ngx-dsfr';

@Component({
  selector: 'dsfr-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class DsfrFormFieldComponent {

  @Input() public identifier = uniqueIdentifier('field');

  control$ = new Subject<NgControl>();
  touched$ = new Subject<boolean>();

  public setControl(control: NgControl) {
    this.control$.next(control);
  }

  public setTouched(touched: boolean) {
    this.touched$.next(touched);
  }
}
