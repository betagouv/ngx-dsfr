/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { DsfrBadge, DsfrTag } from '@betagouv/ngx-dsfr/card';
import { ElementSize, TemplateAlignment, ThemeColor } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './card-module.component.html',
  styleUrls: ['./card-module.component.scss']
})
export class CardModuleComponent implements OnInit {

  formCard = this.formBuilder.group({
    linkTitle: 'This is a title',
    description: 'This is a description',
    detail: 'This is a detail',
    detailIcon: 'fr-icon-warning-fill',
    bottomDetail: 'This is a detail',
    bottomDetailIcon: 'fr-icon-warning-fill',
    label: 'Lorem ipsum dolor sit amet',
    align: TemplateAlignment.VERTICAL,
    link: '/modules/card',
    download: false,
    topBadges: false,
    hasFooter: false
  });

  formCardGrid = this.formBuilder.group({
    nbCards: 3,
    align: TemplateAlignment.VERTICAL
  });

  possibleAlignment: Record<string, TemplateAlignment> = {
    'horizontal': TemplateAlignment.HORIZONTAL,
    'vertical': TemplateAlignment.VERTICAL
  };

  possiblesNbCards: Record<string, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
  };

  colClass: string = 'fr-col-4';
  nbCardsIteration: number[] = [0, 1, 2];

  badges: DsfrBadge[] = [
    {
      label: 'Lorem',
      theme: ThemeColor.NEW
    },
    {
      label: 'Ipsum',
      theme: ThemeColor.SUCCESS
    }
  ];

  tags: DsfrTag[] = [
    {
      label: 'Lorem'
    },
    {
      label: 'Ipsum'
    }
  ]

  @Input() label: string | undefined;
  @Input() theme: ThemeColor | undefined;
  @Input() noIcon?: boolean = false;
  @Input() size?: Omit<ElementSize, 'LARGE'> = ElementSize.MEDIUM;

  private takeUntilDestroyed = takeUntilDestroyed();

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formCardGrid?.valueChanges
      .pipe(this.takeUntilDestroyed)
      .subscribe((data: any) => {
        console.log(data);
        this.nbCardsIteration = Array(data.nbCards).fill(0).map((x, i) => i);
        this.colClass = 'fr-col-' + (12 / data.nbCards);
      });
  }
}
