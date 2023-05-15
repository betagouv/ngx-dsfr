/**
 * Angular imports
 */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_APPNAME_503_ERROR: string =
  'You MUST provide an APP NAME if you do not provide content for a 503 status error 😡 !!!';
export const EMPTY_TITLE_ERROR: string =
  'You MUST provide a value for the title attribute 😡 !!!';

export type ErrorStatus = '404' | '500' | '503';

@Component({
  selector: 'dsfr-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class DsfrErrorPageComponent implements OnInit {

  @ViewChild('content', { static: true }) content: ElementRef<HTMLDivElement> | undefined;

  @Input() appName?: string = '';
  @Input() title: string = '';
  @Input() status: ErrorStatus = '404';
  @Input() homeLink: string = '';
  @Input() contactUsLink: string = '';

  isContentEmpty: boolean | undefined = undefined;

  ngOnInit(): void {
    this.isContentEmpty = !this.content?.nativeElement?.innerHTML?.trim();

    if (!this.title) {
      throw EMPTY_TITLE_ERROR
    }

    if (
      this.isContentEmpty &&
      !this.appName &&
      (this.status === '503')
    ) {
      throw EMPTY_APPNAME_503_ERROR;
    }
  }

}
