/**
 * Angular imports
 */
import { Component, OnDestroy } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

/**
 * 3rd-party imports
 */
import { Subject } from 'rxjs';
import { ElementAlignment } from '@betagouv/ngx-dsfr';

@Component({
  templateUrl: './toggle-module.component.html',
  styleUrls: ['./toggle-module.component.scss']
})
export class ToggleModuleComponent implements OnDestroy {
  form = this.formBuilder.group({
    toggle: true
  });
  formToggle = this.formBuilder.group({
    id: 'toggle-id',
    checkedLabel: 'Checked',
    unCheckedLabel: 'Unchecked',
    label: 'This is a label',
    hint: 'This is a hint',
    align: ElementAlignment.RIGHT,
    disabled: false
  });

  possibleAlignment: Record<string, string> = {
    'right': 'right',
    'left': 'left'
  };

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onToggle(toggle: boolean) {
    console.log(`The toggle is ${toggle ? 'on' : 'off'}`);
  }
}
