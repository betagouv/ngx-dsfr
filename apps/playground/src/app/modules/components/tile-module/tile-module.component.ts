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
import { Subject } from 'rxjs';

@Component({
  templateUrl: './tile-module.component.html',
  styleUrls: ['./tile-module.component.scss']
})
export class TileModuleComponent implements OnInit, OnDestroy {
  formTitleDescriptionAndTitle: FormGroup | undefined;
  formTitleWithoutImage: FormGroup | undefined;
  formTilegrid: FormGroup | undefined;
  errors: Record<string, string> = {
    formTitleWithoutImage: '',
    formTilegrid: ''
  };

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

    this.formTilegrid?.valueChanges.subscribe((data) => {
      this.nbTilesIteration = Array(data.nbTiles).fill(0).map((x, i) => i);
      switch (data.nbTiles.toString()) {
        case '2':
          this.colClass = 'fr-col-6';
          break;
        case '3':
          this.colClass = 'fr-col-4';
          break; ``
        case '4':
          this.colClass = 'fr-col-3';
          break;
      }
    });
  }

  private initForms(): void {
    this.formTitleDescriptionAndTitle = this.formBuilder.group({
      title: 'This is a title',
      description: 'This is a description',
      align: 'vertical',
      link: '/modules/tile',
      breakpoint: 'md'
    });

    this.formTitleWithoutImage = this.formBuilder.group({
      title: 'This is a title',
      description: 'This is a description',
      align: 'vertical'
    });

    this.formTilegrid = this.formBuilder.group({
      nbTiles: 3,
      align: 'vertical'
    });
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
