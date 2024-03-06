/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * 3rd party imports
 */
import { ElementSize, TemplateAlignment } from '@betagouv/ngx-dsfr';

/**
 * Internal imports
 */
import {
  CardBackground,
  CardBorder,
  CardImageRatio,
  DsfrBadge,
  DsfrTag
} from '../card.component';

@Component({
  template: `
    <dsfr-card
      [label]="testLabel"
      [link]="testLink"
      [linkTitle]="testLinkTitle"
      [border]="testBorder"
      [background]="testBackground"
      [size]="testSize"
      [imageAlt]="testImageAlt"
      [description]="testDescription"
      [align]="testAlign"
      [detail]="testDetail"
      [detailIcon]="testDetailIcon"
      [bottomDetail]="testBottomDetail"
      [bottomDetailIcon]="testBottomDetailIcon"
      [download]="testDownload"
      [hasFooter]="testHasFooter"
      [imageRatio]="testImageRatio"
      [topBadges]="testTopBadges"
      [badges]="testBadges"
      [tags]="testTags"
      [image]="testImage">
    </dsfr-card>
  `
})
export class TestHostComponent {
  @Input() testAlign: TemplateAlignment = TemplateAlignment.VERTICAL;
  @Input() testBorder: CardBorder | undefined;
  @Input() testBackground: CardBackground | undefined;
  @Input() testSize: Omit<ElementSize, "MD"> = ElementSize.LARGE;
  @Input() testLabel: string = '';
  @Input() testImage: string | undefined;
  @Input() testImageAlt: string = '';
  @Input() testDescription: string | undefined;
  @Input() testDetail: string | undefined;
  @Input() testDetailIcon: string | undefined;
  @Input() testBottomDetail: string | undefined;
  @Input() testBottomDetailIcon: string | undefined;
  @Input() testLink: string | undefined;
  @Input() testLinkTitle: string | undefined;
  @Input() testImageRatio: CardImageRatio | undefined;
  @Input() testDownload: boolean = false;
  @Input() testHasFooter: boolean = false;
  @Input() testTopBadges: boolean = false;
  @Input() testBadges: DsfrBadge[] | undefined;
  @Input() testTags: DsfrTag[] | undefined;
}
