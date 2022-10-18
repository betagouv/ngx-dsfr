/**
 * TypeScript entities and constants
 */
export interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export const SIDE_NAV: NavItem[] = [
  {
    label: 'Visual Identity',
    path: ''
  },
  {
    label: 'Modules',
    children: [
      {
        label: 'Badge',
        path: '/modules/badge'
      },
      {
        label: 'Button',
        path: '/modules/button'
      },
      {
        label: 'Link',
        path: '/modules/link'
      },
      {
        label: 'Navigation',
        path: '/modules/navigation'
      },
      {
        label: 'Radio',
        path: '/modules/radio'
      },
      {
        label: 'Stepper',
        path: '/modules/stepper'
      }
    ]
  }
];
