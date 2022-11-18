/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './tile-module.component.html',
  styleUrls: ['./tile-module.component.scss']
})
export class TileModuleComponent implements OnInit, OnDestroy {
  formTileDescriptionAndTitle: FormGroup | undefined;
  formTileWithoutImage: FormGroup | undefined;
  formTileGrid: FormGroup | undefined;

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

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formTileDescriptionAndTitle = this.formBuilder.group({
      title: 'This is a title',
      description: 'This is a description',
      align: 'vertical',
      link: '/modules/tile',
      breakpoint: 'md'
    });

    this.formTileWithoutImage = this.formBuilder.group({
      title: 'This is a title',
      description: 'This is a description',
      align: 'vertical'
    });

    this.formTileGrid = this.formBuilder.group({
      nbTiles: 3,
      align: 'vertical'
    });

    this.formTileGrid?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.nbTilesIteration = Array(data.nbTiles).fill(0).map((x, i) => i);
        this.colClass = 'fr-col-' + (12 / data.nbTiles);
      });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
