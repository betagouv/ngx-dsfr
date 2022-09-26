/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementAlignment, ElementSize } from '@betagouv/ngx-dsfr';
import { Navigation } from '@betagouv/ngx-dsfr/navigation';

@Component({
  templateUrl: './navigation-module.component.html',
  styleUrls: ['./navigation-module.component.scss']
})
export class NavigationModuleComponent implements OnInit {

  iconAlignment: typeof ElementAlignment = ElementAlignment;
  linkSize: typeof ElementSize = ElementSize;
  form: FormGroup | undefined;

  navigation: Navigation = [
    {
      "id": "a",
      "icon": "dashboard",
      "label": "MEGA MENU",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "modules",
      "isChildAvailable": true,
      "child": {
        "isMega": true,
        "title": "Titre éditorialisé",
        "description": "Lorem [...] elit ut.",
        "items": [
          {
            "id": "b",
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
            "categories": [
              {
                "id": 'c',
                "label": "Config 1",
                "href": "admin/dashboard/config",
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
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
            "categories": [
              {
                "id": 'eec',
                "label": "ConfigEE 1",
                "href": "admin/dashboard/config",
              },
              {
                "id": 'fee',
                "label": "Configee 2",
                "href": "admin/dashboard/config"
              },
            ]
          }
        ]
      }
    },
    {
      "id": "k",
      "icon": "dashboard",
      "label": "MEGA MENU 2",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dash",
      "isChildAvailable": true,
      "child": {
        "isMega": true,
        "title": "title",
        "description": "description",
        "items": [
          {
            "id": "l",
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
            "categories": [
              {
                "id": 'm',
                "label": "Config",
                "href": "admin/dashboard/config",
              },
              {
                "id": 'p',
                "label": "Config",
                "href": "admin/dashboard/config"
              },
            ]
          }
        ]
      }
    },
    {
      "id": "g",
      "icon": "dashboard",
      "label": "Simple Menu",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dashboard",
      "isChildAvailable": true,
      "child": {
        "isMega": false,
        "items": [
          {
            "id": 'h',
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
          },
          {
            "id": 'i',
            "icon": "cog",
            "label": "Config",
            "isShow": false,
            "href": "admin/dashboard/config",
          },
        ]
      }
    },
    {
      "id": "j",
      "icon": "dashboard",
      "label": "Acces direct",
      "isShow": false,
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dashboard",
      "isChildAvailable": false,
    },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      label: 'DSFR NAvigation works 😁'
    });
  }
}
