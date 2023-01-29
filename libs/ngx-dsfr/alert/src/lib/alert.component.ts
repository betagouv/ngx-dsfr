/**
 * Angular imports
 */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dsfr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class DsfrAlertComponent implements OnInit, AfterViewInit {

  @ViewChild('description') description: ElementRef<HTMLInputElement> | undefined;

  @Input() type!: AlertType;
  @Input() title: string | undefined;
  @Input() hasCloseButton = false;
  @Input() hasRole = false;
  @Input() size: Omit<ElementSize, 'LARGE'> = ElementSize.MEDIUM;

  classes: string = '';
  isClosed = false;
  displayDescription: boolean = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    if (!this.type) {
      throw EMPTY_TYPE_ERROR;
    }

    this.initClasses();
  }

  ngAfterViewInit(): void {
    const description = this.description?.nativeElement.innerHTML.trim();
    this.displayDescription = !!description;

    if (!this.title && !description) {
      throw EMPTY_TITLE_OR_DESCRIPTION_ERROR;
    }

    this.cd.detectChanges();
  }

  private initClasses(): void {
    this.classes += `fr-alert fr-alert--${this.type}`;

    if (this.size === ElementSize.SMALL) {
      this.classes += ` fr-alert--${this.size}`;
    }
  }
}
