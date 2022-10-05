/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Navigation } from '@betagouv/ngx-dsfr/navigation';

@Component({
  templateUrl: './navigation-module.component.html',
  styleUrls: ['./navigation-module.component.scss']
})
export class NavigationModuleComponent implements OnInit {

  form: FormGroup | undefined;

  navigation: Navigation = [
    {
      "id": "a",
      "label": "MEGA MENU",
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "modules",
      "child": {
        "isMega": true,
        "title": "Titre éditorialisé",
        "description": "Lorem [...] elit ut.",
        "children": [
          {
            "id": "b",
            "label": "Config",
            "href": "admin/dashboard/config",
            "children": [
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
            "label": "Config",
            "href": "admin/dashboard/config",
            "children": [
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
      "label": "MEGA MENU 2",
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dash",
      "child": {
        "isMega": true,
        "title": "title",
        "description": "description",
        "children": [
          {
            "id": "l",
            "label": "Config",
            "href": "admin/dashboard/config",
            "children": [
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
      "label": "Simple Menu",
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dashboard",
      "child": {
        "isMega": false,
        "children": [
          {
            "id": 'h',
            "label": "Config",
            "href": "admin/dashboard/config",
          },
          {
            "id": 'i',
            "label": "Config",
            "href": "admin/dashboard/config",
          },
        ]
      }
    },
    {
      "id": "j",
      "label": "Acces direct",
      "userRoles": [
        "ROLE_USER",
        "ROLE_ADMIN"
      ],
      "href": "dashboard",
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
