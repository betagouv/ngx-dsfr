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
        label: 'Alert',
        path: '/modules/alert'
      },
      {
        label: 'Badge',
        path: '/modules/badge'
      },
      {
        label: 'Button',
        path: '/modules/button'
      },
      {
        label: 'Checkbox',
        path: '/modules/checkbox'
      },
      {
        label: 'Footer',
        path: '/modules/footer'
      },
      {
        label: 'Header',
        path: '/modules/header'
      },
      {
        label: 'Input',
        path: '/modules/input'
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
        label: 'Password',
        path: '/modules/password'
      },
      {
        label: 'Radio',
        path: '/modules/radio'
      },
      {
        label: 'Search Bar',
        path: '/modules/search-bar'
      },
      {
        label: 'Stepper',
        path: '/modules/stepper'
      },
      {
        label: 'Tile',
        path: '/modules/tile'
      },
    ]
  }
];
