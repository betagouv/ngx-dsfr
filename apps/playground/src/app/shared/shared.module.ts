/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

/**
 * Internal imports
 */
import { InputPropertyControlComponent } from './components/input-property-control/input-property-control.component';
import { InputPropertyDefinitionComponent } from './components/input-property-definition/input-property-definition.component';

/**
 * TypeScript entities and constants
 */
const exportableDeclarations = [
  InputPropertyControlComponent,
  InputPropertyDefinitionComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  declarations: exportableDeclarations,
  exports: [CommonModule, ReactiveFormsModule, ...exportableDeclarations]
})
export class SharedModule {}
