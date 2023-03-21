/**
 * Angular imports
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { FooterBrand, FooterCategoryLinks, FooterLink } from '@betagouv/ngx-dsfr/footer';

/**
 * 3rd-party imports
 */
import { Subject, takeUntil } from 'rxjs';

/**
 * TypeScript entities and constants
 */
interface FormFooter {
  institution: FormControl<string>;
  description: FormControl<string>;
  displayBrands: FormControl<boolean>;
  displayCategoriesLink: FormControl<boolean>;
  displayOperator: FormControl<boolean>;
}

const OPERATOR_LOGO: string = 'assets/illustrations/Logo ANCT.svg';

const CATEGORIES_LINKS: FooterCategoryLinks[] = [
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
    ]
  },
  {
    title: 'Nom de la catégorie',
    children: [
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
      {
        label: 'Lien de navigation',
        href: '',
      },
    ]
  }
];

const BRANDS: FooterBrand[] = [
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is the main partner',
    href: ''
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: ''
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: ''
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: ''
  },
  {
    image: 'https://www.gouvernement.fr/sites/default/files/static_assets/placeholder.1x1.png',
    alt: 'This is a partner',
    href: ''
  },
];

@Component({
  templateUrl: './footer-module.component.html',
  styleUrls: ['./footer-module.component.scss']
})
export class FooterModuleComponent implements OnInit, OnDestroy {
  formFooter: FormGroup<FormFooter> | undefined;

  possibleInstitutions: Record<string, string> = {
    "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation":
      "Ministère\nde l'enseignement\nsupérieur,\nde la recherche\net de l'innovation",
    "Secrétariat d'État\nchargé de l'égalité\nentre les femmes\net les hommes et\nde la lutte contre\nles discriminations":
      "Secrétariat d'État\nchargé de l'égalité\nentre les femmes\net les hommes et\nde la lutte contre\nles discriminations",
    'République\nFrançaise': 'République\nFrançaise'
  };

  appName: string = '';

  operatorLogo: string | undefined = OPERATOR_LOGO;
  operateurAlt: string = 'agence nationale de la cohésion des territoires';

  bottomLinks: FooterLink[] = [
    {
      label: 'Plan du site',
      href: '#',
    },
    {
      label: 'Accessibilité : non/partiellement/totalement conforme',
      href: '#',
    },
    {
      label: 'Mentions légales',
      href: '#',
    },
    {
      label: 'Données personnelles',
      href: '#',
    },
    {
      label: 'Gestion des cookies',
      href: '#',
    }
  ];

  middleLinks: FooterLink[] = [
    {
      label: 'legifrance.gouv.fr',
      href: 'https://legifrance.gouv.fr',
      isExternal: true
    },
    {
      label: 'gouvernement.fr',
      href: 'https://gouvernement.fr',
      isExternal: true
    },
    {
      label: 'service-public.fr',
      href: 'https://service-public.fr',
      isExternal: true
    },
    {
      label: 'data.gouv.fr',
      href: 'https://data.gouv.fr',
      isExternal: true
    },
  ];

  brands: FooterBrand[] | undefined = BRANDS;
  categoriesLinks: FooterCategoryLinks[] | undefined = CATEGORIES_LINKS;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.formFooter = this.formBuilder.group({
      institution: ["Ministère\nde la transition\nnumérique"],
      description: ['Lorem [...] elit ut.'],
      displayBrands: [true],
      displayCategoriesLink: [true],
      displayOperator: [true]
    });

    this.formFooter.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: () => {
        this.brands = this.formFooter?.value.displayBrands ? BRANDS : undefined;
        this.categoriesLinks = this.formFooter?.value.displayCategoriesLink ? CATEGORIES_LINKS : undefined;
        this.operatorLogo = this.formFooter?.value.displayOperator ? OPERATOR_LOGO : undefined;
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
