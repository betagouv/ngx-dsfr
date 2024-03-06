/**
 * Angular imports
 */
import { Component, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

/**
 * TypeScript entities and constants
 */
export const EMPTY_TOOLTIP_TEXT_ERROR: string =
  'You MUST provide a value for the tooltipText attribute 😡 !!!';
export const EMPTY_TRIGGER_TEXT_ERROR: string =
  'You MUST provide a value for the triggerText attribute 😡 !!!';
export const EMPTY_ID_ERROR: string =
  'You MUST provide a value for the id attribute 😡 !!!';

export enum TooltipTriggerType {
  HOVER = 'HOVER',
  CLICK = 'CLICK'
}

@Component({
  selector: 'dsfr-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class DsfrTooltipComponent implements OnChanges {

  @Input({required: true}) tooltipText!: string;
  @Input({required: true}) triggerText!: string;
  @Input({required: true}) id!: string;
  @Input() triggerOn: TooltipTriggerType = TooltipTriggerType.HOVER;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  public onClick(event: MouseEvent): void {
    // const targetElement = event.target;
    const path = event.composedPath();

    const targetElement = path[0] as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.hideTooltip();
    }
  }

  possibleTriggerTypes: typeof TooltipTriggerType = TooltipTriggerType;
  isTooltipShown = false;
  tooltipCarriersHalfWidth = 16;

  ngOnChanges(): void {
    if (!this.id) {
      throw EMPTY_ID_ERROR;
    }
    if (!this.tooltipText) {
      throw EMPTY_TOOLTIP_TEXT_ERROR;
    }
    if (!this.triggerText) {
      throw EMPTY_TRIGGER_TEXT_ERROR;
    }
  }

  onButtonCLick(e: MouseEvent) {
    this.tooltipCarriersHalfWidth = 16;
    e.stopPropagation();
    this.isTooltipShown = !this.isTooltipShown;
  }

  onLinkCLick(e: MouseEvent) {
    e.preventDefault();
  }

  showTooltip(e: any) {
    this.tooltipCarriersHalfWidth = e.target.offsetWidth / 2;
    this.isTooltipShown = true;
  }

  hideTooltip() {
    this.isTooltipShown = false;
  }
}
