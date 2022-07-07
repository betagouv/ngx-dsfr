/**
 * Angular imports
 */
import { Component } from '@angular/core';

/**
 * 3rd-party imports
 */
import { IconAlignment, LinkSize } from '@betagouv/ngx-dsfr/link';

@Component({
  templateUrl: './link-module.component.html',
  styleUrls: ['./link-module.component.scss']
})
export class LinkModuleComponent {
  iconAlignment: typeof IconAlignment = IconAlignment;
  linkSize: typeof LinkSize = LinkSize;
}
