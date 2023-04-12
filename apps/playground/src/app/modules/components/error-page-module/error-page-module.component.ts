/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
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

/**
 * TypeScript entities and constants
 */
interface FormHeaderWithAppName {
  institution: FormControl<string>;
  appName: FormControl<string>;
  appDescription: FormControl<string>;
}

interface FormHeaderWithLogo extends FormHeaderWithAppName {
  operatorLogoAlt: FormControl<string>;
}

@Component({
  templateUrl: './error-page-module.component.html',
  styleUrls: ['./error-page-module.component.scss']
})
export class ErrorPageModuleComponent implements OnInit, OnDestroy {
  formHeaderWithAppName: FormGroup<FormHeaderWithAppName> | undefined;
  formHeaderWithLogo: FormGroup<FormHeaderWithLogo> | undefined;
  formHeaderComplete: FormGroup<FormHeaderWithLogo> | undefined;
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
      userRoles: ['ROLE_USER', 'ROLE_ADMIN'],
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
      userRoles: ['ROLE_USER', 'ROLE_ADMIN'],
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
      userRoles: ['ROLE_USER', 'ROLE_ADMIN'],
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
    this.formHeaderWithAppName = this.formBuilder.group({
      institution:
        "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation",
      appName: '',
      appDescription: ''
    });

    this.formHeaderWithLogo = this.formBuilder.group({
      institution:
        "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation",
      appName: '',
      appDescription: '',
      operatorLogoAlt: [
        'agence nationale de la cohésion des territoires',
        Validators.required
      ]
    });

    this.formHeaderComplete = this.formBuilder.group({
      institution:
        "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation",
      appName: '',
      appDescription: '',
      operatorLogoAlt: [
        'agence nationale de la cohésion des territoires',
        Validators.required
      ]
    });

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
