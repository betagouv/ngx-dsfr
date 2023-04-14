/**
 * Angular imports
 */
import { Component } from '@angular/core';

/**
 * 3rd-party imports
 */
import { Navigation } from '@betagouv/ngx-dsfr/navigation';

@Component({
  templateUrl: './navigation-module.component.html',
  styleUrls: ['./navigation-module.component.scss']
})
export class NavigationModuleComponent {

  navigationWithMegaMenus: Navigation = [
    {
      "id": "a",
      "label": "Mega menu",
      "href": "modules/navigation",
      "child": {
        "isMega": true,
        "title": "Titre éditorialisé",
        "description": "Lorem [...] elit ut.",
        "children": [
          {
            "id": "b",
            "label": "Config",
            "href": "modules/navigation",
            "children": [
              {
                "id": 'c',
                "label": "Config 1",
                "href": "modules/navigation",
              },
              {
                "id": 'f',
                "label": "Config 2",
                "href": "/modules/navigation"
              },
            ]
          },
          {
            "id": "b2",
            "label": "Submenu",
            "href": "modules/navigation",
            "children": [
              {
                "id": 'eec',
                "label": "Submenu 1",
                "href": "modules/navigation",
              },
              {
                "id": 'fee',
                "label": "Submenu 2",
                "href": "modules/navigation"
              },
            ]
          }
        ]
      }
    },
    {
      "id": "k",
      "label": "Mega menu",
      "href": "modules/navigation",
      "child": {
        "isMega": true,
        "title": "title",
        "description": "description",
        "children": [
          {
            "id": "l",
            "label": "Config",
            "href": "modules/navigation",
            "children": [
              {
                "id": 'm',
                "label": "Config",
                "href": "modules/navigation",
              },
              {
                "id": 'p',
                "label": "Config",
                "href": "modules/navigation"
              },
            ]
          }
        ]
      }
    },
    {
      "id": "g",
      "label": "Simple Menu",
      "href": "dashboard",
      "child": {
        "isMega": false,
        "children": [
          {
            "id": 'h',
            "label": "Config",
            "href": "modules/navigation",
          },
          {
            "id": 'i',
            "label": "Config",
            "href": "modules/navigation",
          },
        ]
      }
    },
    {
      "id": "j",
      "label": "Acces direct",
      "href": "modules/navigation",
    },
  ];

  navigationWithSimpleDropdownMenus: Navigation = [
    {
      "id": "a",
      "label": "Simple dropdown",
      "href": "modules/navigation",
      "child": {
        "isMega": false,
        "children": [
          {
            "id": 'h1',
            "label": "Config",
            "href": "modules/navigation",
          },
          {
            "id": 'i1',
            "label": "Config",
            "href": "modules/navigation",
          },
        ]
      }
    },
    {
      "id": "k",
      "label": "Simple dropdown",
      "href": "modules/navigation",
      "child": {
        "isMega": false,
        "children": [
          {
            "id": 'h2',
            "label": "Config",
            "href": "modules/navigation",
          },
          {
            "id": 'i2',
            "label": "Config",
            "href": "modules/navigation",
          },
        ]
      }
    },
    {
      "id": "g",
      "label": "Simple dropdown",
      "href": "modules/navigation",
      "child": {
        "isMega": false,
        "children": [
          {
            "id": 'h',
            "label": "Config",
            "href": "modules/navigation",
          },
          {
            "id": 'i',
            "label": "Config",
            "href": "modules/navigation",
          },
        ]
      }
    },
    {
      "id": "j",
      "label": "Direct link",
      "href": "modules/navigation",
    },
  ];

  navigationWithDirectLinks: Navigation = [
    {
      "id": "a",
      "label": "Direct link",
      "href": "modules/navigation",
    },
    {
      "id": "k",
      "label": "Direct link",
      "href": "modules/navigation",
    },
    {
      "id": "g",
      "label": "Direct link",
      "href": "modules/navigation",
    },
    {
      "id": "j",
      "label": "Direct link",
      "href": "modules/navigation",
    },
  ];
}
