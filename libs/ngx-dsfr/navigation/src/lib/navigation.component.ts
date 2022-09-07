/**
 * Angular imports
 */
import { Component, Input, OnInit } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for this link 😡 !!!';
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a value for the link attribute 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';

enum TemplateType {
  BACK_TO_TOP,
  INTERNAL,
  EXTERNAL
}

@Component({
  selector: 'dsfr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class DsfrNavigationComponent implements OnInit {

  @Input() navigation: Navigation;

  classes: string = '';

  ngOnInit(): void {
    this.initClasses();
  }

  private initClasses(): void {
    this.classes += ``;
  }
}

export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN';

export interface NavigationItem {
  id: string;
  icon: string;
  label: string;
  href: string;
  isShow: boolean;
  userRoles: UserRole[];
  isChildAvailable?: boolean;
  child?: NavigationItem[];
}

export type Navigation = NavigationItem[];

const menu: Navigation = [
  {
    "id": "zeee",
    "icon": "dashboard",
    "label": "Dashboard",
    "isShow": false,
    "userRoles": [
      "ROLE_USER",
      "ROLE_ADMIN"
    ],
    "href": "dashboard",
    "isChildAvailable": true,
    "child": [
      {
        "userRoles": [
          "ROLE_USER",
          "ROLE_ADMIN"
        ],
        "id": 'ee',
        "icon": "cog",
        "label": "Config",
        "isShow": false,
        "href": "admin/dashboard/config",
      }
    ]
  }]

