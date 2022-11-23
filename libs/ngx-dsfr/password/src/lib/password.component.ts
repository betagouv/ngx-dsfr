/**
 * Angular imports
 */
import {
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';

/**
 * 3rd-party imports
 */
import { ButtonType } from '@betagouv/ngx-dsfr/button';

/**
 * TypeScript entities and constants
 */
export const EMPTY_ALT_ERROR: string =
  'You MUST provide a value for the operatorLogoAlt attribute 😡 !!!';

@Component({
  selector: 'dsfr-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class DsfrPasswordComponent implements OnInit, OnChanges {
  @Input() institution: string = 'République\nFrançaise';
  @Input() operatorLogoSrc: string | undefined;
  @Input() operatorLogoAlt: string | undefined;
  @Input() appName: string | undefined;
  @Input() appDescription: string | undefined;
  @Input() link: string = '/';

  ngOnInit(): void {

    if (this.operatorLogoSrc && !this.operatorLogoAlt) {
      throw EMPTY_ALT_ERROR;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
