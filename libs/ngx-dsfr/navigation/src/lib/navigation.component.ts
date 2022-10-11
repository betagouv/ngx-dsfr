/**
 * Angular imports
 */
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

/**
 * 3rd Party Imports
 */
import { UserRole } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_NAVIGATION_ERROR: string =
  'You MUST provide navigation data for this component 😡 !!!';

interface NavigationItem extends LinkNavigation {
  child?: ChildNavigation;
}

interface LinkNavigation {
  id: string;
  label: string;
  href: string;
  children?: LinkNavigation[];
  userRoles?: UserRole[];
}
interface ChildNavigation {
  isMega?: boolean;
  title?: string;
  description?: string;
  children: LinkNavigation[];
}

export type Navigation = NavigationItem[];

@Component({
  selector: 'dsfr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],

})
export class DsfrNavigationComponent implements OnInit {

  @ViewChildren('dropdownItem') dropdownMenus: QueryList<ElementRef> | undefined;
  @ViewChildren('menuButtonItem') menuButtonItems: QueryList<ElementRef> | undefined;

  @Input() navigation: Navigation | undefined;

  expandedClass: string = 'fr-collapse--expanded';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!this.navigation) {
      throw EMPTY_NAVIGATION_ERROR;
    }
  }

  handleMenu(menuId: string) {
    const selectedItem = this.selectButtonElementRef(menuId);
    const selectedDropdown = this.selectDropdownElementRef(menuId);
    if (selectedDropdown) {
      const isActive = this.isActiveDropdownMenu(selectedDropdown);
      this.hideActiveDropdown();
      if (!isActive) {
        selectedDropdown.nativeElement.classList.add(this.expandedClass);
        selectedItem?.nativeElement.setAttribute('aria-expanded', true);
      }
    }
  }

  private selectDropdownElementRef(idAttribute: string): ElementRef | undefined {
    if (!this.dropdownMenus) {
      return;
    }
    return this.dropdownMenus.filter(element => element.nativeElement.id === idAttribute)[0];
  }

  private selectButtonElementRef(id: string): ElementRef | undefined {
    if (!this.menuButtonItems) {
      return;
    }
    return this.menuButtonItems.filter(element => element.nativeElement.getAttribute('aria-controls') === id)[0];
  }

  hideActiveDropdown(): void {
    if (this.dropdownMenus) {
      this.dropdownMenus.map((element: ElementRef) => {
        element.nativeElement.classList.remove(this.expandedClass);
      });
    }
    if (this.menuButtonItems) {
      this.menuButtonItems.map((element: ElementRef) => {
        element.nativeElement.removeAttribute('aria-expanded');
      });
    }
  }

  private isActiveDropdownMenu(dropdownMenu: ElementRef): boolean {
    return dropdownMenu.nativeElement.classList.contains(this.expandedClass);
  }

  isRouterLinkActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }
}
