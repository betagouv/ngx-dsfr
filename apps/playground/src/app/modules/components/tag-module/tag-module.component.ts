/**
 * Angular imports
 */
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';
import { TagType } from '@betagouv/ngx-dsfr/tag';

@Component({
  templateUrl: './tag-module.component.html',
  styleUrls: ['./tag-module.component.scss']
})
export class TagModuleComponent {
  formTag = this.formBuilder.group({
    label: 'Tag label',
    type: TagType.NON_CLICKABLE,
    icon: '',
    size: ElementSize.MEDIUM,
    link: '',
    isSelected: false
  });

  possibleSizes: Record<string, string> = {
    'sm': 'sm',
    'md': 'md'
  };

  possibleTypes: Record<string, string> = {
    'NON_CLICKABLE': 'NON_CLICKABLE',
    'CLICKABLE': 'CLICKABLE',
    'SELECTABLE': 'SELECTABLE',
    'DELETABLE': 'DELETABLE'
  };

  iconsExamples: Record<string, string> = {
    'fr-icon-ancient-gate-fill': 'fr-icon-ancient-gate-fill',
    'fr-icon-ancient-gate-line': 'fr-icon-ancient-gate-line',
    'fr-icon-ancient-pavilion-fill': 'fr-icon-ancient-pavilion-fill',
    'fr-icon-ancient-pavilion-line': 'fr-icon-ancient-pavilion-line'
  };

  constructor(private formBuilder: NonNullableFormBuilder) {}
}
