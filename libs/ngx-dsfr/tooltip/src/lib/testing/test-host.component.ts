/**
 * Angular imports
 */
import { Component, Input } from '@angular/core';

/**
 * Internal imports
 */
import { TooltipTriggerType } from '../tooltip.component';

@Component({
  template: `
    <dsfr-tooltip
      [id]="testId"
      [tooltipText]="testTooltipText"
      [triggerText]="testTriggerText"
      [triggerOn]="testTriggerOn">
    </dsfr-tooltip>
  `
})
export class TestHostComponent {
  @Input() testId: string = '';
  @Input() testTooltipText: string = '';
  @Input() testTriggerText: string = '';
  @Input() testTriggerOn: TooltipTriggerType = TooltipTriggerType.HOVER;
}
