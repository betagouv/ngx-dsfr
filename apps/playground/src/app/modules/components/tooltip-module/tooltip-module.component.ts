/**
 * Angular imports
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { TooltipTriggerType } from '@betagouv/ngx-dsfr/tooltip';

interface SettingsForm {
  id: FormControl<string>;
  tooltipText: FormControl<string>;
  triggerText: FormControl<string>;
  triggerOn: FormControl<TooltipTriggerType>;
}

@Component({
  templateUrl: './tooltip-module.component.html',
  styleUrls: ['./tooltip-module.component.scss']
})
export class TooltipModuleComponent implements OnInit {
  settingsForm: FormGroup<SettingsForm> | undefined;
  possibleTriggerTypes: typeof TooltipTriggerType = TooltipTriggerType;

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.settingsForm = this.formBuilder.group({
      id: ['tooltip_id', [Validators.required]],
      tooltipText: ['This is a tooltip text', [Validators.required]],
      triggerText: ['This is a text on the trigger', [Validators.required]],
      triggerOn: [TooltipTriggerType.HOVER, [Validators.required]]
    });
  }
}
