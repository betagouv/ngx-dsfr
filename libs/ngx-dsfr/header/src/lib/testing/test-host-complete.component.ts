/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <dsfr-header
      [institution]="testInstitution"
      [link]="testLink"
      [operatorLogoSrc]="testOperatorLogoSrc"
      [operatorLogoAlt]="testOperatorLogoAlt"
      [appName]="testAppName"
      [appDescription]="testAppDescription">
      <ng-template dsfrHeaderAction>
        <a routerLink="./"> Être tenu informé </a>
      </ng-template>
      <ng-template dsfrHeaderAction>
        <a routerLink="./"> Aide et documentation </a>
      </ng-template>
      <ng-template dsfrHeaderAction>
        <dsfr-button
          label="Se connecter"
          icon="account-line">
        </dsfr-button>
      </ng-template>
    </dsfr-header>
  `
})
export class TestHostCompleteComponent {
  @Input() testInstitution: string = '';
  @Input() testLink: string = '';
  @Input() testOperatorLogoSrc: string = '';
  @Input() testOperatorLogoAlt: string = '';
  @Input() testAppName: string = '';
  @Input() testAppDescription: string = '';
}
