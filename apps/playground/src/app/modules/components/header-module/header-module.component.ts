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
type FormInlineTrue = {
  inline: FormControl<boolean>;
  label: FormControl<string>;
  link: FormControl<string>;
  title: FormControl<string>;
};

@Component({
  templateUrl: './header-module.component.html',
  styleUrls: ['./header-module.component.scss']
})
export class HeaderModuleComponent implements OnInit, OnDestroy {
  formInlineTrue: FormGroup<FormInlineTrue> | undefined;
  formInlineTrueErrors: Record<string, string> = {};

  institution: string =
    "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation";
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
    this.formInlineTrue = this.formBuilder.group({
      inline: [{ value: true, disabled: true }],
      label: ['DSFR Link works 😁', Validators.required],
      link: ['https://www.systeme-de-design.gouv.fr/', Validators.required],
      title: 'the documentation about the DSFR'
    });

    this.handleErrors('Please, enter a label for this Component', 'label');
    this.handleErrors('Please, enter a URL for this Component', 'link');
    this.handleErrors(
      'Please, enter a title for this Component if the link is external'
    );
  }

  private handleErrors(errorMsg: string, controlName?: string): void {
    if (controlName) {
      this.formInlineTrue
        ?.get(controlName)
        ?.statusChanges.pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (value: FormControlStatus) => {
            if (value === 'INVALID') {
              this.formInlineTrueErrors[controlName] = errorMsg;
            } else {
              this.formInlineTrueErrors = {};
            }
          }
        });
    } else {
      this.formInlineTrue?.statusChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (value: FormControlStatus) => {
            if (value === 'INVALID') {
              this.formInlineTrueErrors['_form_'] = errorMsg;
            } else {
              this.formInlineTrueErrors = {};
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
