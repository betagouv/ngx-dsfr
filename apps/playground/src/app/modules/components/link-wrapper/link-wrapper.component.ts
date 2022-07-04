/**
 * Angular imports
 */
import { Component } from '@angular/core';

/**
 * 3rd-party imports
 */
import { IconAlignment, LinkSize } from '@betagouv/ngx-dsfr/link';

@Component({
  selector: 'play-link-wrapper',
  templateUrl: './link-wrapper.component.html',
  styleUrls: ['./link-wrapper.component.scss']
})
export class LinkWrapperComponent {
  iconAlignment: typeof IconAlignment = IconAlignment;
  linkSize: typeof LinkSize = LinkSize;
}
