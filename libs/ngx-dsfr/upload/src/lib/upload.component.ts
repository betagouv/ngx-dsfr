/**
 * Angular imports
 */
import {
  Component,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';

/**
 * TypeScript entities and constants
 */


@Component({
  selector: 'dsfr-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class DsfrUploadComponent implements OnInit, OnChanges {

  @Input() isMultipeFiles: boolean = false;
  @Input() hint: string = '';

  @Output()

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
