/**
 * Angular imports
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: exportableDeclarations,
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    ...exportableDeclarations
  ]
})
export class SharedModule {}
