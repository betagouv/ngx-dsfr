/**
 * Angular imports
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_TITLE_OR_DESCRIPTION_ERROR: string =
  'You MUST provide at least a title or a description for this alert 😡 !!!';
export const EMPTY_TYPE_ERROR: string =
  'You MUST provide a type for this alert 😡 !!!';

export enum AlertType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error'
}

@Component({
  selector: 'dsfr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class DsfrAlertComponent implements AfterViewInit, OnChanges {
  @ViewChild('description') description: ElementRef<HTMLDivElement> | undefined;

  @Input() type!: AlertType;
  @Input() title: string | undefined;
  @Input() hasCloseButton = false;
  @Input() hasRole = false;
  @Input() size: Omit<ElementSize, 'LARGE'> = ElementSize.MEDIUM;

  classes: string = '';
  isClosed = false;

  ngOnChanges() {
    const descriptionDiv = this.description?.nativeElement;

    if (!this.title && descriptionDiv && !descriptionDiv.innerHTML.trim()) {
      throw EMPTY_TITLE_OR_DESCRIPTION_ERROR;
    }
    if (!this.type) {
      throw EMPTY_TYPE_ERROR;
    }
    this.initClasses();
  }

  ngAfterViewInit(): void {
    const description = this.description?.nativeElement.innerHTML.trim();

    if (!this.title && !description) {
      throw EMPTY_TITLE_OR_DESCRIPTION_ERROR;
    }
  }

  private initClasses(): void {
    let classes = `fr-alert fr-alert--${this.type}`;

    if (this.size === ElementSize.SMALL) {
      classes += ` fr-alert--${this.size}`;
    }

    this.classes = classes;
  }
}
