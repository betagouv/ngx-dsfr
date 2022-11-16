/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';
import { AlertType } from '@betagouv/ngx-dsfr/alert';

@Component({
  templateUrl: './alert-module.component.html',
  styleUrls: ['./alert-module.component.scss']
})
export class AlertModuleComponent {
  errorType = AlertType.ERROR;
  successType = AlertType.SUCCESS;
  warningType = AlertType.WARNING;
  infoType = AlertType.INFO;
  smallSize = ElementSize.SMALL;
}
