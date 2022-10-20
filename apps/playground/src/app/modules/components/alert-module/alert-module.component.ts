/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { AlertType, ElementSize } from '@betagouv/ngx-dsfr';

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
