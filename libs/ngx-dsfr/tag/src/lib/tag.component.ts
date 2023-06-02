/**
 * Angular imports
 */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

/**
 * 3rd-party imports
 */
import { ElementSize } from '@betagouv/ngx-dsfr';

/**
 * TypeScript entities and constants
 */
export const EMPTY_LABEL_ERROR: string =
  'You MUST provide a label for the tag 😡 !!!';
export const EMPTY_LINK_ERROR: string =
  'You MUST provide a link when the tag is clickable 😡 !!!';

export enum TagType {
  NON_CLICKABLE = 'NON_CLICKABLE',
  CLICKABLE = 'CLICKABLE',
  SELECTABLE = 'SELECTABLE',
  DELETABLE = 'DELETABLE'
}

@Component({
  selector: 'dsfr-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})

export class DsfrTagComponent implements OnChanges {
  @Input() label = '';
  @Input() icon: string | null = null;
  @Input() size: Omit<ElementSize, ElementSize.LARGE> = ElementSize.MEDIUM;
  @Input() link: string | null = null;
  @Input() type: TagType = TagType.NON_CLICKABLE;
  @Input() isSelected = false;

  @Output() selected = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<void>();

  isDeleted = false;
  classes = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.label) {
      throw EMPTY_LABEL_ERROR;
    }
    if (this.type === TagType.CLICKABLE && !this.link) {
      throw EMPTY_LINK_ERROR;
    }
    this.initClass();
  }

  private initClass(): void {
    this.classes = 'fr-tag';
    if (this.size === ElementSize.SMALL) {
      this.classes += ' fr-tag--sm';
    }
    switch (this.type) {
      case TagType.NON_CLICKABLE:
      case TagType.CLICKABLE:
        if (this.icon) {
          this.classes += ` ${this.icon} fr-tag--icon-left`;
        }
        return;
      case TagType.DELETABLE:
        this.classes += ' fr-tag--dismiss';
        return;
    }
  }

  toggleSelect() {
    this.isSelected = !this.isSelected;
    this.selected.emit(this.isSelected);
  }

  delete() {
    this.isDeleted = true;
    this.deleted.emit();
  }
}
