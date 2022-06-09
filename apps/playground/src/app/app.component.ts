/**
 * Angular imports
 */
import { Component } from '@angular/core';

/**
 * 3rd-party imports
 */
import { IconAlignment, LinkSize } from '@betagouv/ngx-dsfr/link';

@Component({
  selector: 'play-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playground';
  iconAlignment: typeof IconAlignment = IconAlignment;
  linkSize: typeof LinkSize = LinkSize;
}
