/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControlStatus,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';
import { Navigation } from '@betagouv/ngx-dsfr/navigation';
import { ElementAlignment } from '@betagouv/ngx-dsfr';
import { ButtonType } from '@betagouv/ngx-dsfr/button';

@Component({
  templateUrl: './header-module.component.html',
  styleUrls: ['./header-module.component.scss']
})
export class HeaderModuleComponent implements OnInit, OnDestroy {
  formHeaderWithAppName = this.formBuilder.group({
    institution:
      'Ministère\nde l\'enseignement\nsupérieur,\nde la recherche\net de l\'innovation',
    appName: '',
    appDescription: '',
    miniMobileHeader: false
  });
  formHeaderWithLogo = this.formBuilder.group({
    institution:
      'Ministère\nde l\'enseignement\nsupérieur,\nde la recherche\net de l\'innovation',
    appName: '',
    searchBar: [{value: true, disabled: false}],
    appDescription: '',
    operatorLogoAlt: [
      'agence nationale de la cohésion des territoires',
      Validators.required
    ],
    miniMobileHeader: false
  });
  formHeaderComplete = this.formBuilder.group({
    institution:
      'Ministère\nde l\'enseignement\nsupérieur,\nde la recherche\net de l\'innovation',
    appName: '',
    appDescription: '',
    searchBar: [{value: true, disabled: false}],
    operatorLogoAlt: [
      'agence nationale de la cohésion des territoires',
      Validators.required
    ],
    miniMobileHeader: false
  });
  errors: Record<string, string> = {
    formHeaderWithLogo: '',
    formHeaderComplete: ''
  };

  possibleInstitutions: Record<string, string> = {
    "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation":
      "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation",
    "Secrétariat d'État\nchargé de l'égalité\nentre les femmes\net les hommes et\nde la lutte contre\nles discriminations":
      "Secrétariat d'État\nchargé de l'égalité\nentre les femmes\net les hommes et\nde la lutte contre\nles discriminations",
    'République\nFrançaise': 'République\nFrançaise'
  };
  navigation: Navigation = [
    {
      id: 'a',
      label: 'MEGA MENU',
      href: './',
      child: {
        isMega: true,
        title: 'Titre éditorialisé',
        description: 'Lorem [...] elit ut.',
        children: [
          {
            id: 'b',
            label: 'Catégorie 1',
            href: './',
            children: [
              {
                id: 'c',
                label: 'Sous-page 1-1',
                href: './'
              },
              {
                id: 'f',
                label: 'Sous-page 1-2',
                href: './'
              }
            ]
          },
          {
            id: 'b2',
            label: 'Catégorie 2',
            href: './',
            children: [
              {
                id: 'eec',
                label: 'Sous-page 2-1',
                href: './'
              },
              {
                id: 'fee',
                label: 'Sous-page 2-2',
                href: './'
              }
            ]
          }
        ]
      }
    },
    {
      id: 'g',
      label: 'Simple menu',
      href: './',
      child: {
        isMega: false,
        children: [
          {
            id: 'h',
            label: 'Page 1',
            href: './'
          },
          {
            id: 'i',
            label: 'Page 2',
            href: './'
          }
        ]
      }
    },
    {
      id: 'j',
      label: 'Lien direct',
      href: './'
    }
  ];
  iconAlignment: typeof ElementAlignment = ElementAlignment;
  buttonTypes: typeof ButtonType = ButtonType;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.handleError(this.formHeaderWithLogo, 'formHeaderWithLogo');
    this.handleError(this.formHeaderComplete, 'formHeaderComplete');
  }

  private handleError(form: FormGroup, formName: string): void {
    form
      .get('operatorLogoAlt')
      ?.statusChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value: FormControlStatus) => {
          if (value === 'INVALID') {
            this.errors[formName] =
              'The operatorLogoAlt property is required if operatorLogoSrc has a value';
          } else {
            this.errors[formName] = '';
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
