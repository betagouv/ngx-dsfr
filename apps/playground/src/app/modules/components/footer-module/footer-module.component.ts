/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { FooterPartner, FooterLinksCategory, FooterLink } from '@betagouv/ngx-dsfr/footer';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

/**
 * TypeScript entities and constants
 */
const operatorLogo: string = 'assets/illustrations/Logo ANCT.svg';
const linksCategories: FooterLinksCategory[] = [
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
      {
        label: 'Lien de navigation',
        href: '/',
        title:'title'
      },
    ]
  }
];

const partners: FooterPartner[] = [
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is the main partner',
    href: '/'
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: '/'
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: '/'
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: '/'
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: '/'
  },
];

@Component({
  templateUrl: './footer-module.component.html',
  styleUrls: ['./footer-module.component.scss']
})
export class FooterModuleComponent implements OnInit, OnDestroy {
  formFooter: FormGroup =  this.formBuilder.group({
    institution: ["Ministère\nde la transition\nnumérique"],
    description: ['Lorem [...] elit ut.'],
    displayPartners: [true],
    displayCategoriesLink: [true],
    displayOperator: [true]
  });

  possibleInstitutions: Record<string, string> = {
    "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation":
      "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation",
    "Secrétariat d'État\nchargé de l'égalité\nentre les femmes\net les hommes et\nde la lutte contre\nles discriminations":
      "Secrétariat d'État\nchargé de l'égalité\nentre les femmes\net les hommes et\nde la lutte contre\nles discriminations",
    'République\nFrançaise': 'République\nFrançaise'
  };

  appName: string = '';

  copyright: FooterLink = {
    label: 'licence etalab-2.0',
    href: 'https://github.com/etalab/licence-ouverte/blob/master/LO.md',
    title:'licence etalab-2.0'
  };

  operatorLogo: string | undefined = operatorLogo;
  operatorAlt: string = 'agence nationale de la cohésion des territoires';

  bottomLinks: FooterLink[] = [
    {
      label: 'Plan du site',
      href: '#',
      title:'title'
    },
    {
      label: 'Accessibilité : non/partiellement/totalement conforme',
      href: '#',
      title:'title'
    },
    {
      label: 'Mentions légales',
      href: '#',
      title:'title'
    },
    {
      label: 'Données personnelles',
      href: '#',
      title:'title'
    },
    {
      label: 'Gestion des cookies',
      href: '#',
      title:'title'
    }
  ];

  partners: FooterPartner[] | undefined = partners;
  categoriesLinks: FooterLinksCategory[] | undefined = linksCategories;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formFooter.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: () => {
        this.partners = this.formFooter?.value.displayPartners ? partners : undefined;
        this.categoriesLinks = this.formFooter?.value.displayCategoriesLink ? linksCategories : undefined;
        this.operatorLogo = this.formFooter?.value.displayOperator ? operatorLogo : undefined;
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
