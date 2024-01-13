/**
 * Angular imports
 */
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * 3rd-party imports
 */
import { TemplateAlign } from '@betagouv/ngx-dsfr/tile';
import { Breakpoint } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './tile-module.component.html',
  styleUrls: ['./tile-module.component.scss']
})
export class TileModuleComponent implements OnInit {
  formTileDescriptionAndTitle = this.formBuilder.group({
    title: 'This is a title',
    description: 'This is a description',
    align: 'vertical' as TemplateAlign,
    download: false,
    detail: 'this is a detail',
    link: '/modules/tile',
    breakpoint: 'md' as Breakpoint
  });

  formTileWithoutImage = this.formBuilder.group({
    title: 'This is a title',
    description: 'This is a description',
    align: 'vertical' as TemplateAlign,
    download: false,
    detail: 'this is a detail',
  });

  formTileGrid = this.formBuilder.group({
    nbTiles: 3,
    align: 'vertical' as TemplateAlign
  });

  possibleAlignment: Record<string, string> = {
    "horizontal": "horizontal",
    "vertical": "vertical",
  };

  possiblesNbTiles: Record<string, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
  };

  possibleBreakpoints: Record<string, string> = {
    'xs': 'xs',
    'sm': 'sù',
    'md': 'md',
    'lg': 'lg',
    'xl': 'xl',
  };

  colClass: string = 'fr-col-4';
  nbTilesIteration: number[] = [0, 1, 2];

  private destroyRef = inject(DestroyRef);

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formTileGrid?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data.nbTiles) {
          this.nbTilesIteration = Array(data.nbTiles).fill(0).map((x, i) => i);
          this.colClass = 'fr-col-' + (12 / data.nbTiles);
        }
      });
  }
}
